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
import PROXY_ABI from "../constants/ABIs/ds-proxy.json";
import gelatoCoreABI from "../constants/ABIs/gelatoCore.json";
import ERC20_ABI from "../constants/ABIs/erc20.json";

// import helpers
import { encodeWithFunctionSelector } from "../helpers";

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
import CircularDeterminate from "./CircularDeterminate";
import AlertDialogSlide from "./AlertDialogSlide";

// Material UI
import { Button } from "@material-ui/core";

function ActionBtn(props) {
	const context = useWeb3Context();
	const userIsRegistered = useContext(ProxyContext);
	const coins = useContext(CoinContext);
	const ordersContext = useContext(OrderContext);
	const timeContext = useContext(TimeContext);
	const time = timeContext.time;
	const orders = ordersContext["orders"];
	const setOrders = ordersContext["setOrders"];
	const selectedTokenDetails = props.selectedTokenDetails;
	const fetchExecutionClaims = props.fetchExecutionClaims
	const updateSelectedTokenDetails = props.updateSelectedTokenDetails
	const standardOverrides =
		// Override tx values
		{
			// The maximum units of gas for the transaction to use
			gasLimit: 3000000,

			// The price (in wei) per unit of gas
			gasPrice: ethers.utils.parseUnits("5.0", "gwei")
		};

	// State
	const updateUserIsRegistered = props.updateUserIsRegistered;

	// Used for reacting to successfull txs
	const [waitingForTX, setWaitingForTX] = React.useState(false);
	// Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
	const [guardAddress, setGuardAddress] = React.useState(undefined);

	// Modal state
	const [modalState, setModalState] = React.useState({
		open: false,
		title: "Modal Title",
		body: "Modal Body",
		btn1: "Cancel",
		btn2: "Confirm",
		func: undefined
	});

	function CreateTransactButton() {
		switch (userIsRegistered) {
			case false:
				return (
					<Button
						variant="contained"
						color="primary"
						onClick={modalCreateUserAccount}
					>
						Create Account
					</Button>
				);
			case true:
				let executableFunc;
                let buttonText;
                let color;
				// If amount is less than or equal to zero, render error modal
				if (coins.amountActionFrom.lte(ethers.utils.bigNumberify(0))) {
					executableFunc = noZeroOrders;
					buttonText = "Schedule Trades";
					color="primary"

					// If amount is greater than zero
				} else {
					if (selectedTokenDetails.sufficientBalance) {
						// User has sufficient balance
						if (!selectedTokenDetails.needAllowance) {
							// User has sufficient ERC20 Approval => Schedule
							executableFunc = modalMintSplitSell;
							buttonText = "Schedule Trades";
							color="primary"
						} else {
							// // User has insufficient ERC20 Approval => Approve ERC20 token first
							executableFunc = approveAndMint;
							buttonText = "Approve + Schedule Trades";
							color="primary"
						}
					} else {
						// Display insufficient balance modal
						executableFunc = displayInsufficientBalance;
						buttonText = "Schedule Trades";
						color="secondary"
					}
				}
				return (
					<Button
						variant="contained"
						color={color}
						onClick={executableFunc}
					>
						{buttonText}
					</Button>
				);

			default:
				return (
					<Button variant="contained" color="primary" >
						Schedule Trades
					</Button>
				);
		}
    }

	function modalCreateUserAccount() {

        const copyModalState = { ...modalState };
        copyModalState.open = true;
        copyModalState.title = `Create a gelato user account`;
        copyModalState.body = `This transaction deploys a proxy contract which acts as your smart contract wallet for interacting with the gelato protocol. No funds will be moved at this point, they will remain in your regular wallet`;
        copyModalState.btn1 = "Cancel";
        copyModalState.btn2 = "Create";
        copyModalState.func = createUserProxy;
        setModalState(copyModalState);
    }

	async function createUserProxy() {
		setWaitingForTX(true);
		let copyModalState = { ...modalState };
		copyModalState.open = false;
		setModalState(copyModalState);

		const signer = context.library.getSigner();

		const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);

		let prefix;
		switch(context.networkId) {
			case(1):
				prefix = '';
				break;
			case(3):
				prefix = 'ropsten.'
				break;
			case(4):
				prefix = 'rinkeby.'
				break;
		}


		// Create User Proxy
		gelatoCoreContract.createUserProxy(standardOverrides).then(
			function(txReceipt) {
				signer.provider
					.waitForTransaction(txReceipt["hash"])
					.then(async function(tx) {
						setWaitingForTX(false);
						copyModalState.open = true;
						const userProxy = await gelatoCoreContract.getProxyOfUser(context.account)
						copyModalState.title = `Successfully created your gelato account!`;
						copyModalState.body = `You can find it on Etherscan here:
						Etherscan Link:
						https://${prefix}etherscan.io/address/${userProxy}

						Now you can start scheduling trades!
						`;
						copyModalState.btn1 = "";
						copyModalState.btn2 = "Close";
						copyModalState.func = undefined;
						setModalState(copyModalState);
						updateUserIsRegistered(true);
						// Fetch guard contract
					});
			},
			error => {
				console.log(error);
				setWaitingForTX(false);
			}
		);
	}

	function displayInsufficientBalance() {
		const actionSellTokenSymbol = coins["actionFrom"]["symbol"];
		const copyModalState = { ...modalState };
		copyModalState.open = true;
		copyModalState.title = `Insufficient ${actionSellTokenSymbol} Balance`;
		copyModalState.body = "";
		copyModalState.btn1 = "";
		copyModalState.btn2 = "Close";
		copyModalState.func = undefined;
		setModalState(copyModalState);
	}

	async function approveAndMint() {
		const actionSellTokenSymbol = coins["actionFrom"]["symbol"];
		const signer = context.library.getSigner();


		const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);
		const proxyAddress = await gelatoCoreContract.getProxyOfUser(context.account)

		const copyModalState = { ...modalState };
		copyModalState.open = true;
		copyModalState.title = `Approve ${actionSellTokenSymbol}`;
		copyModalState.body = `Approve your proxy contract (${proxyAddress}) to move ${actionSellTokenSymbol} on your behalf`;
		copyModalState.btn1 = "Cancel";
		copyModalState.btn2 = "Approve";
		copyModalState.func = approveToken;
		setModalState(copyModalState);
	}

	async function getPrepaymentPrice() {
		const signer = context.library.getSigner();
		// Calculate prepayment costs
		const kyberTradeAddress = kyberTrade.address[context.networkId];
		// method, funcDataTypes, funcParameters
		const executorAddress = EXECUTOR[context.networkId];
		const noOfOrders = time.numOrders;

		const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);

		const kyberSwapPrepayment = await gelatoCoreContract.getMintingDepositPayable(
			kyberTradeAddress,
			executorAddress
		);


		const prepayment =
			parseInt(kyberSwapPrepayment.toString()) * noOfOrders;
		console.log(prepayment)

		const userFriendlyPrepayment = ethers.utils.formatEther(ethers.utils.bigNumberify(prepayment.toString()))

		let etherscanProvider = new ethers.providers.EtherscanProvider();

		// Getting the current Ethereum price
		let etherPrice = await etherscanProvider.getEtherPrice()

		return ({dollarPrepayment: parseFloat(userFriendlyPrepayment*etherPrice).toFixed(2), userFriendlyPrepayment: userFriendlyPrepayment})
	}

	async function approveToken() {
		// Close modal
		setWaitingForTX(true);
		let copyModalState = {...modalState};
		copyModalState.open = false;
		setModalState(copyModalState);

		const signer = context.library.getSigner();
		const actionSellTokenSymbol = coins["actionFrom"]["symbol"];
		const actionSellTokenAddress = coins["actionFrom"]["address"];
		const actionBuyTokenSymbol = coins["actionTo"]["symbol"];

		const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);
		const proxyAddress = await gelatoCoreContract.getProxyOfUser(context.account)

		const actionSellAmount = coins["amountActionFrom"];
		const erc20Contract = new ethers.Contract(
			actionSellTokenAddress,
			ERC20_ABI,
			signer
		);

		const { dollarPrepayment, userFriendlyPrepayment } = await getPrepaymentPrice()

		// Send approve TX
		erc20Contract
			.approve(
				proxyAddress,
				ethers.constants.MaxUint256,
				standardOverrides
			)
			.then(
				function(txReceipt) {
					// console.log("waiting for tx to get mined ...");
                    // console.log("Open modal again for scheduling trades");
                    const decimals = coins.actionFrom.decimals
                    let userfriendlyAmount = ethers.utils.formatUnits(actionSellAmount, decimals)
                    copyModalState.open = true;
					copyModalState.title = `Schedule Orders ${actionSellTokenSymbol}`;
					copyModalState.body = `Confirm swapping ${userfriendlyAmount / time.numOrders} ${actionSellTokenSymbol} for ${actionBuyTokenSymbol} every ${time.intervalTime} ${time.intervalType} using ${time.numOrders} trades starting now

					Required prepayment: ${userFriendlyPrepayment} ETH (=$${dollarPrepayment})
					`;
					copyModalState.btn1 = "Cancel";
					copyModalState.btn2 = "Schedule";
					copyModalState.func = mintSplitSell;
					setModalState(copyModalState);
					// Open Schedule Trade Modal
					signer.provider
						.waitForTransaction(txReceipt["hash"])
						.then(async function(tx) {
							updateSelectedTokenDetails()
							console.log(tx);
							setWaitingForTX(false);
						});
				},
				error => {
                    setWaitingForTX(false);
				}
			);
    }

	function noZeroOrders() {

        const copyModalState = { ...modalState };
        // const actionSellTokenSymbol = coins["actionFrom"]["symbol"];
		// // const actionSellTokenAddress = coins["actionFrom"]["address"];
        // const actionBuyTokenSymbol = coins["actionTo"]["symbol"];
        const actionSellAmount = coins["amountActionFrom"];

        const decimals = coins.actionFrom.decimals
        // let userfriendlyAmount = ethers.utils.formatUnits(actionSellAmount, decimals)
        copyModalState.open = true;
        copyModalState.title = `Amount Cannot be Zero`;
        copyModalState.body = `Please specify an amount greater than 0`;
		copyModalState.btn1 = "Ok";
		copyModalState.btn2 = "";
        copyModalState.func = undefined;
        setModalState(copyModalState);
    }

	async function modalMintSplitSell() {

        const copyModalState = { ...modalState };
        const actionSellTokenSymbol = coins["actionFrom"]["symbol"];
		// const actionSellTokenAddress = coins["actionFrom"]["address"];
        const actionBuyTokenSymbol = coins["actionTo"]["symbol"];
		const actionSellAmount = coins["amountActionFrom"];

		const { dollarPrepayment, userFriendlyPrepayment } = await getPrepaymentPrice()


        const decimals = coins.actionFrom.decimals
        let userfriendlyAmount = ethers.utils.formatUnits(actionSellAmount, decimals)
        copyModalState.open = true;
        copyModalState.title = `Schedule Orders ${actionSellTokenSymbol}`;
		copyModalState.body = `Confirm swapping ${userfriendlyAmount / time.numOrders} ${actionSellTokenSymbol} for ${actionBuyTokenSymbol} every ${time.intervalTime} ${time.intervalType} using ${time.numOrders} trades starting now.

		Required prepayment: ${userFriendlyPrepayment} ETH (=$${dollarPrepayment})`;
        copyModalState.btn1 = "Cancel";
        copyModalState.btn2 = "Schedule";
        copyModalState.func = mintSplitSell;
        setModalState(copyModalState);
    }

	async function mintSplitSell() {
		setWaitingForTX(true);
		let copyModalState = { ...modalState };
		copyModalState.open = false;
		setModalState(copyModalState);

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
		let sellAmountPerSubOrder =  ethers.utils.bigNumberify(actionSellAmount).div(ethers.utils.bigNumberify(time.numOrders))

		const actionBuyToken = coins["actionTo"]["address"];
		const actionBuyTokenSymbol = coins["actionTo"]["symbol"];

		// actionData
		const actionData = [
			context.account,
			actionSellToken,
			sellAmountPerSubOrder.toString(),
			actionBuyToken,
			0
		];


		// Fetch prepayment
		const signer = context.library.getSigner();
		const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);

		const proxyAddress = await gelatoCoreContract.getProxyOfUser(context.account)
		const proxyContract = new ethers.Contract(proxyAddress, PROXY_ABI, signer)

		const timeTriggerAddress = triggerTimestampPassed.address;
		const kyberTradeAddress = kyberTrade.address[context.networkId];
		const actionPayload = encodeWithFunctionSelector(kyberTrade.method, kyberTrade.dataTypesWthNames, actionData);
		// method, funcDataTypes, funcParameters
		const executorAddress = EXECUTOR[context.networkId];
		const startingTime = timestamp;
		// const triggerPayload = encodeWithFunctionSelector(triggerTimestampPassed.method, triggerTimestampPassed.dataTypesWthNames, startingTime);
		const intervalTime = interval;
		const noOfOrders = time.numOrders;
		const kyberSwapPrepayment = await gelatoCoreContract.getMintingDepositPayable(
			kyberTradeAddress,
			executorAddress
		);


		const prepayment =
			parseInt(kyberSwapPrepayment.toString()) * noOfOrders;

		// Override tx values
		let overrides = {
			// The maximum units of gas for the transaction to use
			gasLimit: 4000000,

			// The price (in wei) per unit of gas
			gasPrice: ethers.utils.parseUnits("5.0", "gwei"),

			// The nonce to use in the transaction
			// nonce: 123,

			// The amount to send with the transaction (i.e. msg.value)
			value: ethers.utils.bigNumberify(prepayment.toString())

			// The chain ID (or network ID) to use
			// chainId: 3
		};

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

		// Fetch user proxy address


		proxyContract
			.execute(multiMintKyberTrade.address, multiMintPayload, overrides)
			.then(
				function(txReceipt) {
					signer.provider
						.waitForTransaction(txReceipt["hash"])
						.then(async function(tx) {
                            setWaitingForTX(false);
							copyModalState.open = true;
							copyModalState.title = `Success!`;
							copyModalState.body = `Your orders have been scheduled`;
							copyModalState.btn1 = "";
							copyModalState.btn2 = "Close";
							copyModalState.func = undefined;
							setModalState(copyModalState);
							fetchExecutionClaims()
							updateSelectedTokenDetails()
						});
				},
				error => {
					console.log(error);
					setWaitingForTX(false);
				}
			);
	}

	return (
		<React.Fragment>
			<AlertDialogSlide
				modalState={modalState}
				setModalState={setModalState}
			></AlertDialogSlide>
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
