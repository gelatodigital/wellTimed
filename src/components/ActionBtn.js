import React, { useContext } from "react";
import IfInput from "./LockFrom";
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
import gelatoCoreABI from '../constants/ABIs/gelatoCore.json'


// Import addresses
import { DS_PROXY_REGISTRY, DS_GUARD_FACTORY, GELATO_CORE, example } from '../constants/contractAddresses';
import { AbiCoder } from 'ethers/utils';

import { Icon, Button } from "@material-ui/core";


function ActionBtn(props) {
    const context = useWeb3Context();
    const proxyStatus = useContext(ProxyContext)
    // State
    const updateProxyStatus = props.updateProxyStatus

    // Used to display tx hash
    const [transactionHash, setTransactionHash] = React.useState(undefined);
    // Used for reacting to successfull txs
    const [waitingForTX, setWaitingForTX] = React.useState(false);
    // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
    const [guardAddress, setGuardAddress] = React.useState(undefined)
    //console.log(proxyStatus)


    // If we want to activate metamask when the page loads, we need to use useEffect()
    // useEffect(() => {
    //     console.log("effect")

    // }, [])

    function CreateTransactButton() {
        switch(proxyStatus) {
            case 1:
                return (<Button color='primary' onClick={devirginize}>Create Account</Button>);

            case 2:
                // return (<Button color='primary' onClick={test}>Test</Button>);
                return (<Button color='primary' onClick={deployAndSetGuard}>Create Account2</Button>);

            case 3:
                return (<Button color='primary' onClick={setAuthority}>Approve TriggeredX</Button>);

            case 4:
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

    async function devirginize() {
        console.log("Deploying new Proxy for user")
        setWaitingForTX(true)
        const signer = context.library.getSigner()
        const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId]
        const proxyRegistryContract = new ethers.Contract(proxyRegistryAddress, proxyRegistryABI, signer);
        const gelatoCoreAddress = GELATO_CORE[context.networkId]
        const gelatoCoreContract = new ethers.Contract(gelatoCoreAddress, gelatoCoreABI, signer);

        let guardAddress;
        gelatoCoreContract.on("LogDevirginize", (oldValue, newValue, event) => {
            console.log(`Old Value: ${oldValue}`)
            console.log(`New Value: ${newValue}`)
            guardAddress = newValue
            setGuardAddress(guardAddress)
            console.log(event)
        })

        // Devirginize user
        // 1st Tx
        gelatoCoreContract.devirginize()
        .then(function(txReceipt) {
            signer.provider.waitForTransaction(txReceipt['hash']).then(async function(tx) {
                setWaitingForTX(false)
                updateProxyStatus(3)
                console.log("ProxySuccessfully deployed")
                // Fetch guard contract


                const proxyAddress = await proxyRegistryContract.proxies(context.account)
                console.log(`Deployed Proxy Address: ${proxyAddress}`)
                console.log("Transaction:")
                console.log(tx)
                if(proxyAddress !== ethers.constants.AddressZero)
                {
                    // 2nd Tx
                    const proxyContract = new ethers.Contract(proxyAddress, dsProxyABI, signer)

                } else {
                    console.log("Proxy not found")
                }
            })
        }, (error) => {
            console.log("Sorry")
            setWaitingForTX(false)
        })

    }

    async function deployAndSetGuard() {
        console.log("Deploying new guard")
        setWaitingForTX(true)
        const signer = context.library.getSigner()

        const gelatoCoreAddress = GELATO_CORE[context.networkId]
        const gelatoCoreContract = new ethers.Contract(gelatoCoreAddress, gelatoCoreABI, signer);

        let guardAddress;
        gelatoCoreContract.on("LogGuard", (_guardAddress) => {
            setGuardAddress(_guardAddress)
            console.log(`Guard Address: ${_guardAddress}`)
        })
        // Devirginize user
        gelatoCoreContract.guard()
        .then(function(txReceipt) {
            signer.provider.waitForTransaction(txReceipt['hash']).then(async function(tx) {
                console.log("Guard successfully deployed")
                setWaitingForTX(false)
                updateProxyStatus(3)
                // const proxyAddress = await proxyRegistryContract.proxies(context.account)
                // console.log(`Deployed Proxy Address: ${proxyAddress}`)
                // console.log("Transaction:")
                // console.log(tx)
                // if(proxyAddress !== ethers.constants.AddressZero)
                // {
                //     const proxyContract = new ethers.Contract(proxyAddress, dsProxyABI, signer)
                //     let proxyOwner = await proxyContract.owner()
                //     console.log(`Proxy Owner: ${proxyOwner}`)

                // } else {
                //     console.log("Proxy not found")
                // }
            })
        }, (error) => {
            console.log("Sorry")
            setWaitingForTX(false)
        })
    }


    async function setAuthority() {
        setWaitingForTX(true)
        console.log("Setting Authority")
        const signer = context.library.getSigner()
        const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId]
        const proxyRegistryContract = new ethers.Contract(proxyRegistryAddress, proxyRegistryABI, signer);


        const proxyAddress = await proxyRegistryContract.proxies(context.account)
        const proxyContract = new ethers.Contract(proxyAddress, dsProxyABI, signer)

        console.log(`Setting Guard ${guardAddress} as authority for Proxy: ${proxyAddress}`)
        setWaitingForTX(true)

        proxyContract.setAuthority(guardAddress)
        .then(function(txReceipt) {
            signer.provider.waitForTransaction(txReceipt['hash']).then(async function(tx) {
                console.log("Authority successfully setted")
                setWaitingForTX(false)
                updateProxyStatus(4)
            })
        }, (error) => {
            console.log("Sorry")
            setWaitingForTX(false)
        })
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