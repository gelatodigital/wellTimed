import React from "react";
import erc20 from "../constants/ABIs/erc20";
import { useWeb3Context } from "web3-react";
import { Button, makeStyles } from "@material-ui/core";
import { ethers } from "ethers";
import {
  getTokenBalance,
  getTokenAllowance,
  getCorrectImageLink
} from "../helpers";

function ApproveBtn(props) {
  const context = useWeb3Context();
  function log() {
    console.log(props.activeAddress);
  }
  return (
    <button onClick={log}>asdasd</button>
    //     <button
    //       onClick={async () => {
    //    /*      const estimatedGas = await tokenContract.estimate.approve(
    //           selectedTokenExchangeAddress,
    //           ethers.constants.MaxUint256
    //         ); */
    //         const tokenContract = new ethers.Contract(erc20,erc20,)
    //         tokenContract
    //           .approve(props.address.address, ethers.constants.MaxUint256, {
    //             gasLimit: calculateGasMargin(estimatedGas, GAS_MARGIN)
    //           })
    //           .then(response => {
    //             addTransaction(response, { approval: selectedTokenAddress });
    //           });
    //       }}
    //     >
    //       {t("unlock")}
    //     </button>
  );
}

export default ApproveBtn;
