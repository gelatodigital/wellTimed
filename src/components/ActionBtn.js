import React, { useContext } from "react";
import IfInput from "./IfInput";
import ConditionialSwitch from "./ConditionSwitch";
// web3 library
import { ethers } from "ethers";

// Contexts
// Context so we access the users account & provider
import { useWeb3Context, Connectors } from 'web3-react'
import ProxyContext from '../contexts/ProxyContext'

// Import ABIs
import proxyRegistryABI from '../constants/ABIs/proxy-registry.json';
import dsProxyABI from '../constants/ABIs/ds-proxy.json';
import dummyABI from '../constants/ABIs/dummyContract.json'


// Import addresses
import { DS_PROXY_REGISTRY, DS_GUARD_FACTORY, example } from '../constants/contractAddresses';
import { AbiCoder } from 'ethers/utils';
import { REPLACEMENT_UNDERPRICED } from 'ethers/errors';

import { Icon, Button } from "@material-ui/core";


function ActionBtn() {
    const context = useWeb3Context();
    const proxyStatus = useContext(ProxyContext)
    // State

    // Used to display tx hash
    const [transactionHash, setTransactionHash] = React.useState(undefined);
    // Used for reacting to successfull txs
    const [waitingForTX, setWaitingForTX] = React.useState(false);
    // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
    // const [proxyStatus, setProxyStatus] = React.useState(0)
    //console.log(proxyStatus)


    // If we want to activate metamask when the page loads, we need to use useEffect()
    // useEffect(() => {
    //     console.log("effect")

    // }, [])

    function CreateTransactButton() {
        switch(proxyStatus) {
            case 1:
                return (<Button color='primary' onClick={deployProxy}>Create Account</Button>);

            case 2:
                return (<Button color='primary' onClick={test}>Test</Button>);
                // return (<button onClick={deployAndSetGuard}>Whitelist our relayer</button>);

            case 3:
                return (<Button color='primary' onClick={placeOrder}>Place Order</Button>);

            default:
                return (<Button color='primary' onClick={placeOrder}>Default</Button>);
          }

    }

    function ShowProxyStatus() {
        return (
            <div>
                <h1>ProxyStatus</h1>
                <h1>{proxyStatus}</h1>
            </div>
        )
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

    return (
        <React.Fragment>
            <p>Maxx Stinger</p>
            <ShowProxyStatus></ShowProxyStatus>
            { (context.active || (context.error && context.connectorName)) &&
                <div>

                    { !waitingForTX &&
                        <CreateTransactButton></CreateTransactButton>
                    }
                    { waitingForTX &&
                        <button> Please wait ...</button>
                    }
                    {transactionHash &&
                        <p>Tx Hash: {transactionHash}</p>
                    }
                </div>
            }
        </React.Fragment>
    )

}

export default ActionBtn;