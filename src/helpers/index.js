import { ethers } from "ethers";
import ERC20_ABI from "../constants/ABIs/erc20.json";
import {coins} from '../constants/coins'
import Web3 from 'web3'
const web3 = new Web3(Web3.givenProvider);



// get the token balance of an address
export async function getTokenBalance(tokenAddress, signer) {
  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  return erc20Contract.balanceOf(signer.provider.account);
}

// get the token allowance
export async function getTokenAllowance(tokenAddress, proxyAddress, signer) {
  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  return erc20Contract.allowance(signer.provider.account, proxyAddress);
}

export function getCorrectImageLink() {
  const table1 = {};
  const table2 = {};
  coins[3].forEach(coin => {
    table1[coin["symbol"]] = coin;
  });
  coins[1].forEach(coin => {
    table2[coin["symbol"]] = coin["address"];
  });

  const table3 = {};
  for (let key in table1) {
    for (let key2 in table2) {
      if (key === key2) {
        table1[key]["mainet"] = table2[key2];
        table3[table1[key]["address"]] = table1[key];
      }
    }
  }
  return table3;
}

export async function getEncodedFunction() {

    const blockNumber = await web3.eth.getBlockNumber();
    const block = await web3.eth.getBlock(blockNumber);
    const timestamp = block.timestamp;


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


      // Encode Action

    let actionPayload = web3.eth.abi.encodeFunctionCall(
        {
          name: "action()",
          type: "function",
          inputs: []
        },
        []

    );

    return [triggerPayload, actionPayload]

}
