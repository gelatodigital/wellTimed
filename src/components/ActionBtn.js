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

import { Icon } from "@material-ui/core";


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
                return (<button onClick={deployProxy}>Create Account</button>);

            case 2:
                return (<button onClick={test}>Test</button>);
                // return (<button onClick={setAuthority}>Whitelist our relayer</button>);

            case 3:
                return (<button onClick={placeOrder}>Place Order</button>);

            default:
                return (<button onClick={placeOrder}>Default</button>);
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

        proxyRegistryContract.build()
        .then(function(txReceipt) {
            signer.provider.waitForTransaction(txReceipt['hash']).then(async function(tx) {
                console.log("ProxySuccessfully deployed")
                setWaitingForTX(false)
                const proxyAddress = await proxyRegistryContract.proxies(context.account)
                console.log(`Deployed Proxy Address: ${proxyAddress}`)
                console.log(tx)
                if(proxyAddress !== ethers.constants.AddressZero)
                {
                    const proxyContract = new ethers.Contract(proxyAddress, dsProxyABI, signer)
                    let proxyOwner = await proxyContract.owner()
                    console.log(`Proxy Owner: ${proxyOwner}`)

                } else {
                    console.log("BUG")
                }
            })
        }, (error) => {
            console.log("Sorry")
            setWaitingForTX(false)
        })

    }


    async function setAuthority(guardAddress) {
        console.log("Test 2")
        console.log("Deploying new Proxy for user")
        setWaitingForTX(true)
        const signer = context.library.getSigner()
        const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId]
        const proxyRegistryContract = new ethers.Contract(proxyRegistryAddress, proxyRegistryABI, signer);
        const proxyAddress = await proxyRegistryContract.proxies(context.account)
        const proxyContract = new ethers.Contract(proxyAddress, dsProxyABI, signer)

        // Fetch Guard contract
        proxyContract.setAuthority(guardAddress)
    }


    async function placeOrder() {
        console.log("Test 3")
    }

    return (
        <React.Fragment>
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