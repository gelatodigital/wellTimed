// Not used
import React, { useContext } from "react";
import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import Button from "@material-ui/core/Button";
import { GELATO_CORE } from "../constants/contractAddresses";
import { ethers } from "ethers";

import gelatoCoreABI from "../constants/ABIs/gelatoCore.json";
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

    const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
		);

		const proxyAddress = await gelatoCoreContract.getProxyOfUser(context.account)
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
