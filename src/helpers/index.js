import { ethers } from "ethers";
import ERC20_ABI from "../constants/ABIs/erc20.json";
import {coins} from '../constants/coins'
import Web3 from 'web3'
const web3 = new Web3(Web3.givenProvider);



// get the token balance of an address
export async function getTokenBalance(tokenAddress, signer, signerAddress) {
  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  return erc20Contract.balanceOf(signerAddress);
}

// get the token allowance
export async function getTokenAllowance(tokenAddress, proxyAddress, signer, userAddress) {
  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  return erc20Contract.allowance(userAddress, proxyAddress);
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
        table1[key]["mainnet"] = table2[key2];
        table3[table1[key]["address"]] = table1[key];
      }
    }
  }
  return table3;
}

export async function getEncodedFunction(triggerSellToken, triggerSellAmount, triggerBuyToken, triggerBuyAmount, isBigger, actionSellToken,actionrSellAmount, actionBuyToken, slippage)
{

    let triggerPayload = web3.eth.abi.encodeParameters(['address','address', 'uint256', 'bool', 'uint256'], [triggerSellToken, triggerBuyToken, triggerSellAmount, isBigger, triggerBuyAmount ]
    );


    let actionPayload = web3.eth.abi.encodeParameters(['address','address', 'uint256', 'uint256'], [ actionSellToken, actionBuyToken, actionrSellAmount, slippage ]
    );

    return [triggerPayload, actionPayload]

}


//  let actionPayload = web3.eth.abi.encodeFunctionCall(
    //     {
    //       name: "action(address,address,uint256,uint256)",
    //       type: "function",
    //       inputs: [
    //         {
    //           type: "address",
    //           name: "user"
    //         },
    //         {
    //           type: "address",
    //           name: "src"
    //         },
    //         {
    //           type: "address",
    //           name: "dest"
    //         },
    //         {
    //           type: "uint256",
    //           name: "srcAmount"
    //         },
    //         {
    //           type: "uint256",
    //           name: "slippage"
    //         }
    //       ]
    //     }, [actionSellToken,actionrSellAmount, actionBuyToken, actionBuyAmount]