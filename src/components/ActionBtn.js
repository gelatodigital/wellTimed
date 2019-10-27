import React, { useContext } from "react";

// web3 library
import { ethers } from "ethers";

// Contexts
// Context so we access the users account & provider
import { useWeb3Context } from "web3-react";
import ProxyContext from "../contexts/ProxyContext";
import CoinContext from "../contexts/CoinContext";
import OrderContext from "../contexts/OrderContext";
import TimeContext from "../contexts/TimeContext";

// Import ABIs
import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";
import dsProxyABI from "../constants/ABIs/ds-proxy.json";
import gelatoCoreABI from "../constants/ABIs/gelatoCore.json";

// import helpers
import { encodePayload, encodeWithFunctionSelector } from "../helpers";

// Import addresses
import {
	DS_PROXY_REGISTRY,
	GELATO_CORE,
	EXECUTOR
} from "../constants/contractAddresses";
import { triggerTimestampPassed } from "../constants/triggers";
import { kyberTrade } from "../constants/actions";
import { multiMintKyberTrade } from "../constants/scripts";

// Import Components
import CircularDeterminate from './CircularDeterminate'

// Material UI
import { Button } from "@material-ui/core";


function ActionBtn(props) {
	const context = useWeb3Context();
	const proxyStatus = useContext(ProxyContext);
	const coins = useContext(CoinContext);
	const ordersContext = useContext(OrderContext);
	const timeContext = useContext(TimeContext);
	const time = timeContext.time;
	const orders = ordersContext["orders"];
	const setOrders = ordersContext["setOrders"];
	const standardOverrides =
		// Override tx values
		{
			// The maximum units of gas for the transaction to use
			gasLimit: 3000000,

			// The price (in wei) per unit of gas
			gasPrice: ethers.utils.parseUnits("5.0", "gwei")
		};

	// State
	const updateProxyStatus = props.updateProxyStatus;

	// Used to display tx hash
	const [transactionHash] = React.useState(undefined);
	// Used for reacting to successfull txs
	const [waitingForTX, setWaitingForTX] = React.useState(false);
	// Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
	const [guardAddress, setGuardAddress] = React.useState(undefined);
	//console.log(proxyStatus)

	function CreateTransactButton() {
		switch (proxyStatus) {
			case 1:
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={devirginize}
					>
						Create Account
					</Button>
				);

			case 2:
				// return (<Button color='primary' onClick={test}>Test</Button>);
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={deployAndSetGuard}
					>
						Connect your Account
					</Button>
				);

			case 3:
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={setAuthority}
					>
						Connect your Account
					</Button>
				);

			case 4:
				return (<Button variant="contained" color='primary' onClick={mintSplitSell}>Split Sell Now</Button>);

			default:
				return (
					<Button variant="contained" color="primary">
						Split Sell Now
					</Button>
				);
		}
	}

	async function devirginize() {
		console.log("Deploying new Proxy for user");
        setWaitingForTX(true);

		const signer = context.library.getSigner();
		const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId];
		const proxyRegistryContract = new ethers.Contract(
			proxyRegistryAddress,
			proxyRegistryABI,
			signer
		);
		const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);

		let guardAddress;
		gelatoCoreContract.on("LogDevirginize", (oldValue, newValue, event) => {
			console.log(`Old Value: ${oldValue}`);
			console.log(`New Value: ${newValue}`);
			guardAddress = newValue;
			setGuardAddress(guardAddress);
			localStorage.setItem("guardAddress", guardAddress);
			console.log(event);
		});

		// Devirginize user
		// 1st Tx
		gelatoCoreContract.devirginize(standardOverrides).then(
			function(txReceipt) {
				signer.provider
					.waitForTransaction(txReceipt["hash"])
					.then(async function(tx) {
						setWaitingForTX(false);
						updateProxyStatus(3);
						console.log("ProxySuccessfully deployed");
						// Fetch guard contract

						const proxyAddress = await proxyRegistryContract.proxies(
							context.account
						);
						console.log(`Deployed Proxy Address: ${proxyAddress}`);
						console.log("Transaction:");
						console.log(tx);
						if (proxyAddress !== ethers.constants.AddressZero) {
							// 2nd Tx
							const proxyContract = new ethers.Contract(
								proxyAddress,
								dsProxyABI,
								signer
							);
						} else {
							console.log("Proxy not found");
						}
					});
			},
			error => {
				console.log("Sorry");
				setWaitingForTX(false);
			}
		);
	}

	async function deployAndSetGuard() {
		console.log("Deploying new guard");
		setWaitingForTX(true);
		const signer = context.library.getSigner();

		const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);

		let guardAddress;
		gelatoCoreContract.on("LogGuard", _guardAddress => {
			setGuardAddress(_guardAddress);
			console.log(`Guard Address: ${_guardAddress}`);
			localStorage.setItem("guardAddress", guardAddress);
		});
		// Devirginize user
		gelatoCoreContract.guard(standardOverrides).then(
			function(txReceipt) {
				signer.provider
					.waitForTransaction(txReceipt["hash"])
					.then(async function(tx) {
						console.log("Guard successfully deployed");
						setWaitingForTX(false);
						updateProxyStatus(3);
					});
			},
			error => {
				console.log("Sorry");
				setWaitingForTX(false);
			}
		);
	}

	async function setAuthority() {
		setWaitingForTX(true);
		console.log("Setting Authority");
		const signer = context.library.getSigner();
		const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId];
		const proxyRegistryContract = new ethers.Contract(
			proxyRegistryAddress,
			proxyRegistryABI,
			signer
		);

		const proxyAddress = await proxyRegistryContract.proxies(
			context.account
		);
		const proxyContract = new ethers.Contract(
			proxyAddress,
			dsProxyABI,
			signer
		);
		let guardAddressCopy = guardAddress;
		if (guardAddressCopy === undefined) {
			guardAddressCopy = localStorage.getItem("guardAddress");
		}

		console.log(
			`Setting Guard ${guardAddressCopy} as authority for Proxy: ${proxyAddress}`
		);
		setWaitingForTX(true);

		proxyContract.setAuthority(guardAddressCopy, standardOverrides).then(
			function(txReceipt) {
				signer.provider
					.waitForTransaction(txReceipt["hash"])
					.then(async function(tx) {
						console.log("Authority successfully setted");
						setWaitingForTX(false);
						updateProxyStatus(4);
					});
			},
			error => {
				console.log("Sorry");
				setWaitingForTX(false);
			}
		);
	}

	/*
    function createRowLegacyTrade(triggerSellToken, triggerSellAmount, triggerBuyToken, triggerBuyAmount, actionSellToken, actionSellAmount, actionBuyToken, isBigger) {
    */

	function createRowLegacyTrade(
		actionSellToken,
		actionBuyToken,
		actionSellAmount,
		interval,
		noOfOrders,
		timestamp
	) {
		const orderCopy = [...orders];

		for (let i = 0; i < noOfOrders; i++) {
			timestamp = timestamp + interval * i;
			let date = new Date(timestamp * 1000);
			const timestampString = `${date.toLocaleDateString()} - ${date.toLocaleTimeString()}`;

			const newOrder = {
				swap: `${actionSellToken.toString()} ${actionSellAmount.toString()} => ${actionBuyToken.toString()}`,
				when: timestampString,
				status: "open"
			};

			orderCopy.push(newOrder);
		}

		// const sign = isBigger ? ">=" : "<="

		// const newOrder = {
		//     ifThis: `${triggerSellAmount.toString()} ${triggerSellToken.toString()} ${sign} ${triggerBuyAmount.toString()} ${triggerBuyToken.toString()}`, thenSwap: `${actionSellToken.toString()} ${actionSellAmount.toString()} => ${actionBuyToken.toString()}`, created: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`, status: 'open', action: 'cancel'
		// }

		// let newOrders;
		// // check the page's state, if it is still default or we already fetched orders from localStorage
		// console.log("preOrders")
		// console.log(orders)
		// orders === 0 ? newOrders = [] : newOrders = [...orders];
		// newOrders.push(newOrder)
		// // Push new order into local storage
		// localStorage.setItem(`triggered-${context.account}`, JSON.stringify(newOrders))
		// Set state including new order
		setOrders(orderCopy);
	}

	async function mintSplitSell() {
        setWaitingForTX(true);

		// Function to call
		// splitSellMint(address _timeTrigger, address _kyberSwapAction, bytes calldata _actionPayload, address _excecutor, uint256 _startingTime, uint256 _intervalTime, uint256 _noOfOrders, uint256 _prepayment) d

		let timestamp = Math.floor(Date.now() / 1000);
		let multiplier;
		switch (time.intervalType) {
			case "minutes":
				multiplier = 60;
				break;

			case "hours":
				multiplier = 3600;
				break;

			case "days":
				multiplier = 86400;
				break;

			default:
				multiplier = 60;
				break;
		}
		let interval = (time.intervalTime * multiplier) / time.numOrders;

		// encode action
		const actionSellToken = coins["actionFrom"]["address"];
		const actionSellTokenSymbol = coins["actionFrom"]["symbol"];
		const actionSellAmount = coins["amountActionFrom"];

		const actionBuyToken = coins["actionTo"]["address"];
		const actionBuyTokenSymbol = coins["actionTo"]["symbol"];

		// actionData
		const actionData = [
			actionSellToken,
			actionBuyToken,
			actionSellAmount,
			0
		];
		console.log(actionData);

		// Fetch prepayment
		const signer = context.library.getSigner();
		const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);

		const timeTriggerAddress = triggerTimestampPassed.address;
		const kyberTradeAddress = kyberTrade.address;
		const actionPayload = encodePayload(kyberTrade.dataTypes, actionData);
		const executorAddress = EXECUTOR[context.networkId];
		const startingTime = timestamp;
		const intervalTime = interval;
		const noOfOrders = time.numOrders;
		const kyberSwapPrepayment = await gelatoCoreContract.getMintingDepositPayable(
			kyberTradeAddress,
			executorAddress
		);

		console.log(kyberSwapPrepayment.toString());

		const prepayment =
			parseInt(kyberSwapPrepayment.toString()) * noOfOrders;
		console.log(`Needed Prepayment: ${prepayment}`);

		// Override tx values
		let overrides = {
			// The maximum units of gas for the transaction to use
			gasLimit: 800000,

			// The price (in wei) per unit of gas
			gasPrice: ethers.utils.parseUnits("3.0", "gwei"),

			// The nonce to use in the transaction
			// nonce: 123,

			// The amount to send with the transaction (i.e. msg.value)
			value: ethers.utils.bigNumberify(prepayment.toString())

			// The chain ID (or network ID) to use
			// chainId: 3
		};

		/*
        address _timeTrigger,
        uint256 _startTime,  // will be encoded here
        address _action,
        bytes calldata _specificActionParams,
        address payable _selectedExecutor,
        // MultiMintTimeBased params
        uint256 _intervalSpan,
        uint256 _numberOfMints
        */

		const multiMintPayload = encodeWithFunctionSelector(
			multiMintKyberTrade.funcSelector,
			multiMintKyberTrade.dataTypesWithName,
			[
				timeTriggerAddress,
				startingTime,
				kyberTradeAddress,
				actionPayload,
				executorAddress,
				intervalTime,
				noOfOrders
			]
		);

		// decoder(multiMintPayload, multiMintKyberTrade.dataTypesWithName)

		console.log(`About to mint:
            kyber Action address: ${kyberTradeAddress},
            timeTriggerAddress: ${timeTriggerAddress},
            executorAddress: ${executorAddress}
            StartingTime: ${startingTime},
            intervalTime: ${intervalTime},
            noOfOrders: ${noOfOrders},
            kyberSwapPrepayment: ${kyberSwapPrepayment.toString()},
            FuncSelector: ${multiMintKyberTrade.funcSelector},
            DataTypes: ${multiMintKyberTrade.dataTypesWithName},
            Action Payload: ${actionPayload}





            Payload: ${multiMintPayload},
        `);

		// Fetch user proxy address
		const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId];
		const proxyRegistryContract = new ethers.Contract(
			proxyRegistryAddress,
			proxyRegistryABI,
			signer
		);

		const proxyAddress = await proxyRegistryContract.proxies(
			context.account
		);
		const proxyContract = await new ethers.Contract(
			proxyAddress,
			dsProxyABI,
			signer
		);

		// address _target, bytes memory _data

		// Send Tx to Proxy registry

		createRowLegacyTrade(
			actionSellTokenSymbol,
			actionBuyTokenSymbol,
			actionSellAmount,
			intervalTime,
			noOfOrders,
			timestamp
		);
		proxyContract
			.execute(multiMintKyberTrade.address, multiMintPayload, overrides)
			.then(
				function(txReceipt) {
					console.log("waiting for tx to get mined ...");
					signer.provider
						.waitForTransaction(txReceipt["hash"])
						.then(async function(tx) {
							console.log("Execution Claim successfully minted");
							setWaitingForTX(false);
							console.log(tx);
							createRowLegacyTrade(
								actionSellTokenSymbol,
								actionBuyTokenSymbol,
								actionSellAmount,
								intervalTime,
								noOfOrders,
								timestamp
							);

							// createRow(triggerSellTokenSymbol, triggerSellAmount, triggerBuyTokenSymbol, triggerBuyAmount, actionSellTokenSymbol, actionSellAmount, actionBuyTokenSymbol, isBigger)
						});
				},
				error => {
					console.log("Sorry");
					console.log(error);
					setWaitingForTX(false);
				}
			);
	}

	/*
    async function placeOrder() {
        // 1. Check which trigger / action the user selected

        // 2. Convert user input into ready to be encoded data
        // Goal: [timestamp]
        // 1. Convert current timestamp from milliseconds to seconds

        // const triggerDataArray = convertUserInput()
        // let triggerPayload;
        // triggerDataArray.forEach(triggerData => {
        //     console.log(triggerData)
        //     triggerPayload = encodePayload(triggerTimestampPassed['dataTypes'], triggerData)
        // })

        // console.log(triggerDataArray)
        // console.log(triggerPayload)

        // ACTION: Token SWAP INPUT
        const actionSellToken = coins['actionFrom']['address']
        const actionSellTokenSymbol = coins['actionFrom']['symbol']
        const actionSellAmount = coins['amountActionFrom']

        const actionBuyToken = coins['actionTo']['address']
        const actionBuyTokenSymbol = coins['actionTo']['symbol']

        // console.log(numOrders, intervalTime, intervalType)

        if( triggerSellToken === ""|| coins['actionTo'] === ""|| coins['actionFrom'] === ""|| isBigger === "") {return}

        console.log(`
        Execution Claim Overview:


            Condition: If ${triggerSellAmount} ${coins["triggerFrom"]["symbol"]} is greater or equal to ${triggerBuyAmount} ${coins["triggerTo"]["symbol"]}

            Action: Sell ${actionSellAmount} ${coins["actionFrom"]["symbol"]} to ${coins["actionTo"]["symbol"]}


        `)


        // Get encoded trigger and action payload + addresses
        let array = await getEncodedFunction(triggerSellToken, triggerSellAmount, triggerBuyToken, triggerBuyAmount, isBigger, actionSellToken, actionSellAmount, actionBuyToken, minAmount)
        const triggerPayload = array[0]
        const actionPayload = array[1]
        console.log(`
            TriggerPayload: ${triggerPayload}
            ActionPayload: ${actionPayload}`)
        // console.log(`actionPayload: ${actionPayload}`)


        // Prepayment => call getMintingDepositPayable(_action, _selectedExecutor)
        setWaitingForTX(true)
        const signer = context.library.getSigner()
        const gelatoCoreAddress = GELATO_CORE[context.networkId]
        const gelatoCoreContract = new ethers.Contract(gelatoCoreAddress, gelatoCoreABI, signer);

        const action = KYBER_ACTION[context.networkId]['address']
        const trigger = KYBER_TRIGGER[context.networkId]['address']
        const executor = EXECUTOR[context.networkId]

        console.log(`executor: ${executor}, action: ${action}, `)


        let prepayment = await gelatoCoreContract.getMintingDepositPayable(action, executor)
        console.log(`Needed Prepayment: ${prepayment}`)

        let overrides = {

            // The maximum units of gas for the transaction to use
            // gasLimit: 23000,

            // The price (in wei) per unit of gas
            gasPrice: ethers.utils.parseUnits('3.0', 'gwei'),

            // The nonce to use in the transaction
            // nonce: 123,

            // The amount to send with the transaction (i.e. msg.value)
            value: prepayment,

            // The chain ID (or network ID) to use
            // chainId: 3

        };

        gelatoCoreContract.mintExecutionClaim(trigger, triggerPayload, action, actionPayload, executor, overrides)
        .then( function(txReceipt) {
            console.log("waiting for tx to get mined ...")
            signer.provider.waitForTransaction(txReceipt['hash'])
            .then(async function(tx) {
                    console.log("Execution Claim successfully minted")
                    setWaitingForTX(false)
                    console.log(tx)

                    createRow(triggerSellTokenSymbol, triggerSellAmount, triggerBuyTokenSymbol, triggerBuyAmount, actionSellTokenSymbol, actionSellAmount, actionBuyTokenSymbol, isBigger)
            })
        }, (error) => {
            console.log("Sorry")
            setWaitingForTX(false)
        })

    }
   */

	return (
		<React.Fragment>
			{(context.active || (context.error && context.connectorName)) && (
				<div>
					{!waitingForTX && (
						<CreateTransactButton></CreateTransactButton>
					)}
                    {waitingForTX && (
                        <CircularDeterminate></CircularDeterminate>
                    )}


				</div>
			)}

			{!context.active && (
				<Button
					color="primary"
					onClick={() => {
						context.setFirstValidConnector(["MetaMask", "Infura"]);
					}}
				>
					Connect Metamask
				</Button>
			)}
		</React.Fragment>
	);
}

export default ActionBtn;
