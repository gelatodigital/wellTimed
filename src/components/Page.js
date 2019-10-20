import React, { useContext } from "react";

// Import Components
import LockFrom from "./LockFrom";
import LockTo from "./LockTo";
import ConditionialSwitch from "./ConditionSwitch";
import ActionBtn from "./ActionBtn";
import ConnectBtn from "./ConnectBtn";

import CoinContext, { CoinProvider } from "../contexts/CoinContext";

// Import ContextParents
import { ProxyProvider } from "../contexts/ProxyContext";

// web3 library
import { ethers } from "ethers";
// Context so we access the users account & provider
import { useWeb3Context } from "web3-react";

// Import ABIs
import dummyABI from "../constants/ABIs/dummyContract.json";

// Import addresses
import {
  example
} from "../constants/contractAddresses";

import { Icon, makeStyles, Card, CardContent } from "@material-ui/core";
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
  },
  title: {
    textAlign: "left"
  }
});

function Page() {
  const context = useWeb3Context();
  const classes = style();
  const coinContext = useContext(CoinContext);
  // State
  // Activate the current ERC20 Token
  const [erc20, setERC20] = React.useState(null);
  const [activeCoins, setActivCoins] = React.useState({
    triggerFrom: "",
    triggerTo: "",
    actionFrom: "",
    actionTo: ""
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

  function updateActiveCoins(coins) {
    console.log(`Setting coins in Page.js`);
    console.log(`${coins}`);
    setProxyStatus(coins);
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

  return (
    <React.Fragment>
      <ProxyProvider value={proxyStatus}>
        <CoinProvider value={activeCoins}>
          <ConnectBtn updateProxyStatus={updateProxyStatus} />
          <h1>Swap tokens depending on conditions</h1>
          <Card className={classes.card} raised>
            <CardContent>
              <h4 className={classes.title}>If this condition is true</h4>
              <LockFrom></LockFrom>
              <ConditionialSwitch></ConditionialSwitch>
              <LockTo></LockTo>
            </CardContent>
          </Card>
          <Icon>arrow_downward</Icon>
          <Card className={classes.card} raised>
            <CardContent>
              <h4 className={classes.title}>Then swap these coins</h4>
              <ERC20Input updateActiveCoins={updateActiveCoins}></ERC20Input>
              <ApproveBtn></ApproveBtn>
              <Icon className={classes.arrow}>arrow_downward</Icon>
              <SwapTo></SwapTo>
            </CardContent>
          </Card>
          <ActionBtn updateProxyStatus={updateProxyStatus}></ActionBtn>
          <Order></Order>
        </CoinProvider>
      </ProxyProvider>
    </React.Fragment>
  );
}

export default Page;
