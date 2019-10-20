import React, { useContext } from "react";
import IfInput from "./LockFrom";
import ConditionialSwitch from "./ConditionSwitch";
// web3 library
import { ethers } from "ethers";
import Web3 from 'web3'

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


function Encoder(props) {
    const web3 = new Web3(Web3.givenProvider);

    async function blockNumber() {
        const blockNumber = await web3.eth.getBlockNumber();
        const block = await web3.eth.getBlock(blockNumber);
        const timestamp = block.timestamp;
        console.log(`Timestamp: ${timestamp}`)

        let triggerPayload = web3.eth.abi.encodeFunctionCall(
            {
              name: "fired(uint256)",
              type: "function",
              inputs: [
                {
                  type: "uint256",
                  name: "_timestamp"
                }
              ]
            },
            [ timestamp ]
          );

        console.log(`triggerPayload: ${triggerPayload}`)
          // Encode Action

        let actionPayload = web3.eth.abi.encodeFunctionCall(
            {
              name: "action()",
              type: "function",
              inputs: []
            },
            []

        );
        console.log(`actionPayload: ${actionPayload}`)

    }

    function Hallo() {
        const test = blockNumber()
        return (<p>Test</p>)
    }




    return (
        <div>
            <h3>Test</h3>
            <Hallo></Hallo>
        </div>
    )

}

export default Encoder;