import React from "react";
import { useWeb3Context } from "web3-react";
import { Button, makeStyles } from "@material-ui/core";
import { ethers } from "ethers";
import { getTokenBalance, getTokenAllowance } from '../helpers';

function ApproveBtn() {



    <button
        onClick={async () => {
            const estimatedGas = await tokenContract.estimate.approve(
            selectedTokenExchangeAddress,
            ethers.constants.MaxUint256
            )
            tokenContract
            .approve(selectedTokenExchangeAddress, ethers.constants.MaxUint256, {
                gasLimit: calculateGasMargin(estimatedGas, GAS_MARGIN)
            })
            .then(response => {
                addTransaction(response, { approval: selectedTokenAddress })
            })
        }}
        >
        {t('unlock')}
    </button>
}

export default ApproveBtn;