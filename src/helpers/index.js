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

export async function approveToken(signer, beneficiary, tokenAddress) {

  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);

  // Send approve TX
  erc20Contract.approve(beneficiary, ethers.constants.MaxUint256)
  .then( function(txReceipt) {
    console.log("waiting for tx to get mined ...")
    signer.provider.waitForTransaction(txReceipt['hash'])
    .then(async function(tx) {
      console.log("ERC20 Token successfully approved")
      console.log(tx)
    })
  }, (error) => {
      console.log("Sorry")

  })
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
  const table4 = []

  for (let key in table1) {
    for (let key2 in table2) {
      if (key === key2) {
        table1[key]["mainnet"] = table2[key2];
        table3[table1[key]["symbol"]] = table1[key];
        table4.push(table1[key])
      }
    }
  }

  function compare( a, b ) {
    if ( a.symbol < b.symbol ){
      return -1;
    }
    if ( a.symbol > b.symbol ){
      return 1;
    }
    return 0;
  }

  table4.sort(compare)
  return table4
}




export async function getEncodedFunctionSellKyber(triggerSellToken, triggerSellAmount, triggerBuyToken, triggerBuyAmount, isBigger, actionSellToken,actionrSellAmount, actionBuyToken, slippage)
{

    let triggerPayload = web3.eth.abi.encodeParameters(['address','address', 'uint256', 'bool', 'uint256'], [triggerSellToken, triggerBuyToken, triggerSellAmount, isBigger, triggerBuyAmount ]
    );


    let actionPayload = web3.eth.abi.encodeParameters(['address','address', 'uint256', 'uint256'], [ actionSellToken, actionBuyToken, actionrSellAmount, slippage ]
    );

    return [triggerPayload, actionPayload]

}

export function encodePayload(funcDataTypes, funcParameters)
{
    return web3.eth.abi.encodeParameters(funcDataTypes, funcParameters);
}

export function encodeWithFunctionSelector(method, funcDataTypes, funcParameters)
{
  return web3.eth.abi.encodeFunctionCall({
    name: method,
    type: 'function',
    inputs: funcDataTypes
  }, funcParameters)
}

export function simpleDecoder(encodedPayload, dataTypesWithName)
{

  //  web3.eth.abi.decodeParameters(
  //   dataTypesWithName,
  //   encodePayload
  // );
  // console.log("Decoded Payload: decodedPayload ", decodedPayload);


  let decodedPayload = web3.eth.abi.decodeParameter('uint256', encodedPayload);
  // console.log(decodedPayload)
  // console.log("Decoded Payload: decodedPayload ", decodedPayload);

  return decodedPayload
}

export function simpleMultipleDecoder(encodedPayload, dataTypes) {
  return web3.eth.abi.decodeParameters(dataTypes, encodedPayload)
}



export function decoder(encodedPayload, dataTypesWithName)
{
  let decodedPayload
  let returnedDataPayload = ""
  let returnedFuncSelec = ""


  for (let i = 0; i < encodedPayload.length; i++) {
    if (i < 10) {
      returnedFuncSelec = returnedFuncSelec.concat(encodedPayload[i]);
    } else {
      returnedDataPayload = returnedDataPayload.concat(encodedPayload[i]);
    }
  }
  // console.log(`Returned Payload Size: ${returnedPayloadSize}`);
  // console.log(`Returned Payload Size: ${returnedPayloadSize.length}`);
  // console.log("---");
  // console.log(`Returned Func Selec: ${returnedFuncSelec}`);
  // console.log(`Returned Func Selec: ${returnedFuncSelec.length}`);
  // console.log("---");
  // console.log(`Returned Data Payload: ${returnedDataPayload}`);
  // console.log(
  //   `Returned Data Payload Length: ${returnedDataPayload.length}`
  // );
  // console.log("---");
  // console.log(`Returned whole encoded payload: ${encodedPayload}`);
  // console.log(
  //   `Returned whole encoded payload length: ${encodedPayload.length}`
  // );
  decodedPayload = web3.eth.abi.decodeParameters(
    dataTypesWithName,
    returnedDataPayload
  );
  // console.log("Decoded Payload: decodedPayload ", decodedPayload);
  // console.log(decodedPayload)
  // console.log(returnedFuncSelec)
  // console.log("Decoded Payload: decodedPayload ", decodedPayload);
  return decodedPayload
}
