import React, { useContext } from "react";
import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import { getTokenBalance, getTokenAllowance } from "../helpers";
import Button from "@material-ui/core/Button";
import { DS_PROXY_REGISTRY } from "../constants/contractAddresses";
import { ethers } from "ethers";

import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";
import ERC20_ABI from "../constants/ABIs/erc20.json";

function ApproveBtn(probs) {
  const context = useWeb3Context();
  const coinContext = useContext(CoinContext);
  let loading = false;
  const [waitingForTX, setWaitingForTX] = React.useState(false);

  const needAllowance = probs.needAllowance
  const updateAllowance = probs.updateAllowance
  const [state, setState] = React.useState(null);

  async function userHasToken() {
    if (context.active && !!coinContext.ERC20.address) {
      const signerAddress = context.account;
      const signer = context.library.getSigner();
      let tokens;
      await getTokenBalance(
        coinContext.actionFrom.address,
        signer,
        signerAddress
      ).then(data => (tokens = data));
      return tokens;
    } else {
      return;
    }
  }



  const checkOptions = async function() {
    let userToken;
    await userHasToken().then(data => (userToken = data));
    if (
      context.active &&
      !!coinContext.ERC20.address &&
      userToken._hex !== "0x00"
    ) {
      setState({ cool: true });
      return (
        <Button
          color={loading ? "pending" : "primary"}
          onClick={async () => {
            loading = true;
            const signer = context.library.getSigner();
            const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId];
            const proxyRegistryContract = new ethers.Contract(
              proxyRegistryAddress,
              proxyRegistryABI,
              signer
            );
            const proxyAddress = await proxyRegistryContract.proxies(
              context.account
            );
            await getTokenAllowance(
              coinContext.ERC20.address,
              proxyAddress,
              context.library.getSigner()
            );
            loading = false;
          }}
        >
          Approve allowance
        </Button>
      );
    } else if (context.active && !!coinContext.ERC20.address) {
      setState({ cool: true });
      return <Button>You got insufficient token amount</Button>;
    } else {
      setState({ cool: true });
      return <Button>yes</Button>;
    }
  };

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
        <Button onClick={approveToken} color={loading ? "pending" : "primary"}>Approve</Button>
      }
      { (needAllowance && waitingForTX) &&
        <Button onClick={approveToken} color={loading ? "pending" : "primary"}>Waiting...</Button>
      }
    </div>
  );
}

export default ApproveBtn;
