import React from "react";
import IfInput from "./IfInput";
import ConditionialSwitch from "./ConditionSwitch";
// web3 library
import { ethers } from "ethers";
// Context so we access the users account & provider
import { useWeb3Context, Connectors } from 'web3-react'

// Import ABIs
import proxyRegistryABI from '../constants/ABIs/proxy-registry.json';
import dsProxyABI from '../constants/ABIs/ds-proxy.json';
import dummyABI from '../constants/ABIs/dummyContract.json'


// Import addresses
import { DS_PROXY_REGISTRY, DS_GUARD_FACTORY, example } from '../constants/contractAddresses';
import { AbiCoder } from 'ethers/utils';
import { REPLACEMENT_UNDERPRICED } from 'ethers/errors';

import { Icon } from "@material-ui/core";

function MyComponent() {
    console.log(`Component rendered`)

    const context = useWeb3Context();
    // State

    // Used to display tx hash
    const [transactionHash, setTransactionHash] = React.useState(undefined);
    // Used for reacting to successfull txs
    const [waitingForTX, setWaitingForTX] = React.useState(false);
    // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
    const [proxyStatus, setProxyStatus] = React.useState(0)


    // If we want to activate metamask when the page loads, we need to use useEffect()
    // useEffect(() => {
    //     console.log("effect")

    // }, [])

    function ActionButton() {
        switch(proxyStatus) {
            case 1:
                return (<button onClick={deployProxy}>Create Account</button>);

            case 2:
                return (<button onClick={test}>Test</button>);
                // return (<button onClick={deployAndSetGuard}>Whitelist our relayer</button>);

            case 3:
                return (<button onClick={placeOrder}>Place Order</button>);

            default:
                return (<button onClick={placeOrder}>Default</button>);
          }

    }

    function LogIn() {
        return (
            <button onClick={() => {
                context.setFirstValidConnector(['MetaMask', 'Infura'])
                } }>
            Connect Metamask</button>
        )
    }

    function LogOut() {
        checkIfUserHasProxy();
        return (
            <button onClick={() => {
                context.unsetConnector()
            }}>
                Deactivate</button>
        )
    }

    function sendDummyTransaction() {
        const signer = context.library.getSigner()
        console.log("Sending Tx")

        // For Button loader
        setWaitingForTX(true)

        signer
        .sendTransaction({
            to: ethers.constants.AddressZero,
            value: ethers.utils.bigNumberify("0")
        })
        .then(({ hash }) => {
            setTransactionHash(hash);
            setWaitingForTX(false);
        });
    }

    async function checkIfUserHasProxy() {
        const signer = context.library.getSigner()
        const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId]
        const proxyRegistryContract = new ethers.Contract(proxyRegistryAddress, proxyRegistryABI, signer)
        let proxyAddress = await proxyRegistryContract.proxies(context.account);
        if (proxyAddress === ethers.constants.AddressZero)
        {
            console.log("No proxy found, please deploy proxy through registry + deploy associated guard through guard registry")
            setProxyStatus(1)
            // Deploy Proxy
            // Deploy Guard
        }
        else
        {
            console.log(`Proxy exists - Address: ${proxyAddress}`)
            // fetch proxy
            const proxyContract = new ethers.Contract(proxyAddress, dsProxyABI, signer)
            // Check if proxy has guard / authority
            let guardAddress = await proxyContract.authority()
            if (guardAddress === ethers.constants.AddressZero)
            {
                console.log("No guard contract found, please 1) deploy guard and 2) set as authority")
                setProxyStatus(2)
            }
            else
            {
                console.log(`Guard contract found - address: ${guardAddress}`)
                console.log("Set Guard as authority")
                setProxyStatus(3)
            }


        }
    }

    async function test() {


        const signer = context.library.getSigner()
        const dummyContract = new ethers.Contract(example['dummy'], dummyABI, signer)
        const dummyTransactionPromise = dummyContract.increment();

        dummyTransactionPromise.then(function(txReceipt) {
            console.log(txReceipt['hash'])
            signer.provider.waitForTransaction(txReceipt['hash']).then(function(transaction) {
                // console.log('Transaction Mined: ' + transaction.hash);
                console.log(transaction);
                console.log("mined")
            });
        })
    }


    async function deployProxy() {
        console.log("Deploying new Proxy for user")
        setWaitingForTX(true)
        const signer = context.library.getSigner()
        const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId]
        const proxyRegistryContract = new ethers.Contract(proxyRegistryAddress, proxyRegistryABI, signer);
        try {
            await proxyRegistryContract.build()
            // error.message.includes("User denied transaction signature")
            setWaitingForTX(false)
            const proxyAddress = proxyRegistryContract.proxies(context.account)
            console.log(`Deployed Proxy Address: ${proxyAddress}`)
            const proxyContract = new ethers.Contract(proxyAddress, dsProxyABI, signer)
            let proxyOwner = await proxyContract.owner()
            console.log(`Proxy Owner: ${proxyOwner}`)
        // hanlde user rejecting the transaction
        } catch(error) {
            console.log(`This error: ${error}`)
            setWaitingForTX(false)
            return
        }
    }

    async function deployAndSetGuard() {
        console.log("Test 2")
    }

    async function placeOrder() {
        console.log("Test 3")
    }
    // async function sendTxExample() {
    //     const dummyContractAddress = DS_PROXY_REGISTRY[context.networkId]
    //     const signer = context.library.getSigner();
    //     const dummyContract = new ethers.Contract(dummyContractAddress, dummyContractABI, signer);
    //     // Get the current value
    //     let currentValue = await dummyContract.counter();
    //     console.log(`Current Value: ${currentValue}`);
    //     await dummyContract.increment();
    //     currentValue = await dummyContract.counter();
    //     console.log(`Current Value: ${currentValue}`);
    // }




    return (
        <React.Fragment>
            <h1>Web3 React Demo Shit</h1>
            <h3>Trying out Metamask Logins / Logouts</h3>


            {/* Render LogIn / LogOut Button */}
            {/* {context.active ? (<IsLoggedIn/>) : (<IsLoggedOut/>)} */}
            { (context.active || (context.error && context.connectorName)) &&
                <div>
                    <LogOut></LogOut>
                    <h4>Your Address: {context.account}</h4>

                    { !waitingForTX &&
                        <ActionButton></ActionButton>
                    }
                    { waitingForTX &&
                        <button> Please wait ...</button>
                    }
                    {transactionHash &&
                        <p>Tx Hash: {transactionHash}</p>
                    }
                </div>
            }
            { !context.active &&
                <div>
                    <LogIn></LogIn>
                </div>
            }
        </React.Fragment>
    )

    /*
    const context = useWeb3Context();

  // State
  console.log(context);

  // Used to display tx hash
  const [transactionHash, setTransactionHash] = React.useState(undefined);
  // Used for reacting to successfull txs
  const [waitingForTX, setWaitingForTX] = React.useState(false);
  // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
  const [proxyStatus, setProxyStatus] = React.useState(0);

  // If we want to activate metamask when the page loads, we need to use useEffect()
  // useEffect(() => {
  //     console.log("effect")

  // }, [])

  function sendDummyTransaction() {
    const signer = context.library.getSigner();
    console.log("Sending Tx");

    // For Button loader
    setWaitingForTX(true);

    signer
      .sendTransaction({
        to: ethers.constants.AddressZero,
        value: ethers.utils.bigNumberify("0")
      })
      .then(({ hash }) => {
        setTransactionHash(hash);
        setWaitingForTX(false);
      });
  }

  async function deployProxy() {
    console.log("Test 1");
    // const signer = context.library.getSigner()
    // const dummyContractAddress = DS_PROXY_REGISTRY[context.networkId]
    // const dummyContract = new ethers.Contract(dummyContractAddress, dummyContractABI, signer);
    // // Get the current value
    // let currentValue = await dummyContract.counter();
    // console.log(`Current Value: ${currentValue}`);
    // await dummyContract.increment();
    // currentValue = await dummyContract.counter();
    // console.log(`Current Value: ${currentValue}`);
  }

  async function deployAndSetGuard() {
    console.log("Test 2");
  }

  async function placeOrder() {
    console.log("Test 3");
  }
  // async function sendTxExample() {
  //     const dummyContractAddress = DS_PROXY_REGISTRY[context.networkId]
  //     const signer = context.library.getSigner();
  //     const dummyContract = new ethers.Contract(dummyContractAddress, dummyContractABI, signer);
  //     // Get the current value
  //     let currentValue = await dummyContract.counter();
  //     console.log(`Current Value: ${currentValue}`);
  //     await dummyContract.increment();
  //     currentValue = await dummyContract.counter();
  //     console.log(`Current Value: ${currentValue}`);
  // }

  return (
    <React.Fragment>
      <h1>Swap tokens depending on conditions</h1>
      <IfInput></IfInput>
      <ConditionialSwitch></ConditionialSwitch>
      <IfInput></IfInput>
      <Icon>arrow_downward</Icon>
      <IfInput></IfInput>
      <Icon>arrow_downward</Icon>
      <IfInput></IfInput>
    </React.Fragment>
  );

  */
}

export default MyComponent;
