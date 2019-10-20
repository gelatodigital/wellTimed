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

  const [state, setState] = React.useState(null);

  async function userHasToken() {
    if (context.active && !!coinContext.ERC20.address) {
      const signerAddress = context.account;
      const signer = context.library.getSigner();
      let tokens;
      await getTokenBalance(
        coinContext.ERC20.address,
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

  return (
    <div>
      <button onClick={checkOptions}>Refresh</button>
      {/* {checkOptions} */}
    </div>
  );
}

export default ApproveBtn;
