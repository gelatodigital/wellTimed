import React, { useEffect } from "react";

// Import Components
import LockFrom from "./LockFrom";
import LockTo from "./LockTo";
import ConditionialSwitch from "./ConditionSwitch";
import ActionBtn from "./ActionBtn";
import ConnectBtn from "./ConnectBtn";

// Import ContextParents
import { ProxyProvider } from "../contexts/ProxyContext";

// web3 library
import { ethers } from "ethers";
// Context so we access the users account & provider
import { useWeb3Context, Connectors } from "web3-react";

// Import ABIs
import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";
import dsProxyABI from "../constants/ABIs/ds-proxy.json";
import dummyABI from "../constants/ABIs/dummyContract.json";

// Import addresses
import {
  DS_PROXY_REGISTRY,
  DS_GUARD_FACTORY,
  example
} from "../constants/contractAddresses";
import { AbiCoder } from "ethers/utils";
import { REPLACEMENT_UNDERPRICED } from "ethers/errors";

import { Icon, makeStyles, Card, CardContent } from "@material-ui/core";
import { borderColor } from "@material-ui/system";
import Order from "./orders";
import ApproveBtn from "./ApproveBtn";
import ERC20Input from "./ERC20Input";
import SwapTo from "./SwapTo";

const style = makeStyles({
  card: {
    margin: "50px"
  },
  arrow: {
    marginTop: "20px"
  }
});

function Page() {
  const context = useWeb3Context();
  const classes = style();
  // State
  // Activate the current ERC20 Token
  const [erc20, setERC20] = React.useState(null);
  const [activeCoins, setActivCoins] = React.useState({
    lockTo: "",
    lockfrom: "",
    ERC20: "",
    swapTo: ""
  });
  // Used to display tx hash
  const [transactionHash, setTransactionHash] = React.useState(undefined);
  // Used for reacting to successfull txs
  const [waitingForTX, setWaitingForTX] = React.useState(false);
  // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
  const [proxyStatus, setProxyStatus] = React.useState(0);

  function updateProxyStatus(newProxyStatus) {
    console.log(`Setting new Proxy Status in Page.js`);
    console.log(`${newProxyStatus}`);
    setProxyStatus(newProxyStatus);
  }

  async function test() {
    const signer = context.library.getSigner();
    const dummyContract = new ethers.Contract(
      example["dummy"],
      dummyABI,
      signer
    );
    const dummyTransactionPromise = dummyContract.increment();

    dummyTransactionPromise.then(function(txReceipt) {
      console.log(txReceipt["hash"]);
      signer.provider
        .waitForTransaction(txReceipt["hash"])
        .then(function(transaction) {
          // console.log('Transaction Mined: ' + transaction.hash);
          console.log(transaction);
          console.log("mined");
        });
    });
  }

  function activeAddress(address) {
    setActivCoins({ ...activeCoins, ERC20: address });
  }

  const lockFrom = (coin) => {
    console.log("Page: LogForm")
    setActivCoins({...activeCoins, lockFrom: coin})
    console.log(coin);
  }

  return (
    <React.Fragment>
      <ProxyProvider value={proxyStatus}>
        <ConnectBtn updateProxyStatus={updateProxyStatus} />
        <h1>Swap tokens depending on conditions</h1>
        <Card className={classes.card} raised>
          <CardContent>
            <LockFrom lockFrom={lockFrom}></LockFrom>
            <ConditionialSwitch></ConditionialSwitch>
            <LockTo ></LockTo>
          </CardContent>
        </Card>
        <Icon>arrow_downward</Icon>
        <Card className={classes.card} raised>
          <CardContent>
            <ERC20Input activeAddress={activeAddress}></ERC20Input>
            <ApproveBtn></ApproveBtn>
            <Icon className={classes.arrow}>arrow_downward</Icon>
            <SwapTo></SwapTo>
          </CardContent>
        </Card>
        <ActionBtn></ActionBtn>
        <Order></Order>
      </ProxyProvider>
    </React.Fragment>
  );
}

export default Page;
