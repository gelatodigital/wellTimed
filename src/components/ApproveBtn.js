import React, { useContext } from "react";
import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import { getTokenBalance } from "../helpers";
import Button from "@material-ui/core/Button";
import { DS_PROXY_REGISTRY } from "../constants/contractAddresses";
import { ethers } from "ethers";

import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";
import ERC20_ABI from "../constants/ABIs/erc20.json";

function ApproveBtn(probs) {
  const context = useWeb3Context();
  const coinContext = useContext(CoinContext);
  const [waitingForTX, setWaitingForTX] = React.useState(false);

  const needAllowance = probs.needAllowance
  const updateAllowance = probs.updateAllowance

  async function approveToken() {
    setWaitingForTX(true)
    const signer = context.library.getSigner();
    const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId];
    const proxyRegistryContract = new ethers.Contract(
      proxyRegistryAddress,
      proxyRegistryABI,
      signer
    );
    const proxyAddress = await proxyRegistryContract.proxies(
      context.account)

    const sellTokenAddress = coinContext['actionFrom']['address'];
    const erc20Contract = new ethers.Contract(sellTokenAddress, ERC20_ABI, signer);

    // Send approve TX
    erc20Contract.approve(proxyAddress, ethers.constants.MaxUint256)
    .then( function(txReceipt) {
      console.log("waiting for tx to get mined ...")
      signer.provider.waitForTransaction(txReceipt['hash'])
      .then(async function(tx) {
        console.log("ERC20 Token successfully approved")
        setWaitingForTX(false)
        updateAllowance()
        console.log(tx)
      })
    }, (error) => {
        console.log("Sorry")
        setWaitingForTX(false)
        updateAllowance()
    })
  }

  return (
    <div>
      { (needAllowance && !waitingForTX) &&
        <Button onClick={approveToken} color={"primary"}>Approve</Button>
      }
      { (needAllowance && waitingForTX) &&
        <Button onClick={approveToken} color={"secondary"}>Waiting...</Button>
      }
    </div>
  );
}

export default ApproveBtn;
