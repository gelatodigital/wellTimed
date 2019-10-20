import React, { useContext } from "react";
import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import { getTokenBalance, getTokenAllowance } from "../helpers";
import Button from "@material-ui/core/Button";
import { DS_PROXY_REGISTRY } from "../constants/contractAddresses";
import { ethers } from "ethers";
import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";

function ApproveBtn() {
  const context = useWeb3Context();
  const coinContext = useContext(CoinContext);

  let loading = false;

  async function userHasToken() {
    if (context.active && !!coinContext.ERC20.address) {
      const signerAddress = context.account;
      const signer = context.library.getSigner();
      const tokens = await getTokenBalance(
        coinContext.ERC20.address,
        signer,
        signerAddress
      ).then(res => res.json());
      console.log(tokens);
      return tokens;
    } else {
      return;
    }
  }

  function userNeedToApprove() {
    console.log(!!coinContext.ERC20.address);
    if (context.active && userHasToken() && !!coinContext.ERC20.address) {
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
      return <div>You got insufficient token amount</div>;
    }
  }

  return <div>{userNeedToApprove()}</div>;
}

export default ApproveBtn;

// <Button
// onClick={async () => {
//   /*      const estimatedGas = await tokenContract.estimate.approve(
//       selectedTokenExchangeAddress,
//       ethers.constants.MaxUint256
//     ); */
//   const tokenContract = new ethers.Contract(
//     coinContext.ERC20.address,
//     erc20,
//     context.library.getSigner()
//   );
//   /*     tokenContract
//       .approve(props.address.address, ethers.constants.MaxUint256, {
//         gasLimit: calculateGasMargin(estimatedGas, GAS_MARGIN)
//       })
//       .then(response => {
//         addTransaction(response, { approval: selectedTokenAddress });
//       }); */
// }}
// >Connect
// {/*    {t("unlock")} */}
// </Button>
