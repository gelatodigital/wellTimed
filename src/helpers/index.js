import { ethers } from 'ethers'
import ERC20_ABI from '../constants/abis/erc20'

// get the token balance of an address
export async function getTokenBalance(tokenAddress, signer) {
    const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
    return erc20Contract.balanceOf(signer.provider.account)
}

  // get the token allowance
  export async function getTokenAllowance(tokenAddress, proxyAddress, signer) {
    const erc20Contract = new ethers.Contract(tokenAddress, ERC20_ABI, signer)
    return erc20Contract.allowance(signer.provider.account, proxyAddress)
  }