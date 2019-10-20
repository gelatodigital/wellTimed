import { ethers } from "ethers";
import ERC20_ABI from "../constants/ABIs/erc20.json";
import {coins} from '../constants/coins'

// get the token balance of an address
export async function getTokenBalance(tokenAddress, signer, signerAddress) {
  const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
  console.log(signerAddress);
  return erc20Contract.balanceOf(signerAddress);
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
        table1[key]["mainnet"] = table2[key2];
        table3[table1[key]["address"]] = table1[key];
      }
    }
  }
  return table3;
}
