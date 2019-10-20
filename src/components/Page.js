import React, { useContext } from "react";

// Import Components
import LockFrom from "./LockFrom";
import LockTo from "./LockTo";
import ConditionialSwitch from "./ConditionSwitch";
import ActionBtn from "./ActionBtn";
import ConnectBtn from "./ConnectBtn";

import CoinContext, { CoinProvider } from "../contexts/CoinContext";

import { OrderProvider } from "../contexts/OrderContext";


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
    triggerFrom: {
      symbol: "KNC",
      name: "KyberNetwork",
      address: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
      decimals: 18,
      id: "0xdd974d5c2e2928dea5f71b9825b8b646686bd200",
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      },
      reserves_src: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7",
        "0xA467b88BBF9706622be2784aF724C4B44a9d26F4"
      ],
      reserves_dest: [
        "0x63825c174ab367968EC60f061753D3bbD36A0D8F",
        "0x21433Dec9Cb634A23c6A4BbcCe08c83f5aC2EC18",
        "0xD6000fda0b38f4Bff4CfAb188E0bd18e8725a5e7",
        "0xA467b88BBF9706622be2784aF724C4B44a9d26F4"
      ]
    },
    triggerTo: "",
    actionFrom: {
      symbol: "LINK",
      name: "Chain Link",
      address: "0xb4f7332ed719eb4839f091eddb2a3ba309739521",
      decimals: 18,
      id: "0xb4f7332ed719eb4839f091eddb2a3ba309739521",
      reserves_src: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      reserves_dest: ["0xEB52Ce516a8d054A574905BDc3D4a176D3a2d51a"],
      logo: function(address) {
        return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
      }},
    actionTo: ""
  });
  const [needAllowance, setNeedAllowance] = React.useState(false)

  const [rows, setRows] = React.useState()


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
    setActivCoins(coins);
  }

  function updateAllowance(bool) {
    console.log(`Setting allowance in Page.js`);
    console.log(`${bool}`);
    setNeedAllowance(bool);
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
          <OrderProvider value={setRows, rows}>
            <ConnectBtn updateProxyStatus={updateProxyStatus} />
            <h1>TriggeredX</h1>
            <h3>Cross-Token Conditional Limit Orders for DEXs</h3>
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
                <ERC20Input needAllowance={needAllowance} updateAllowance={updateAllowance} updateActiveCoins={updateActiveCoins}></ERC20Input>
                <br></br>
                <ApproveBtn updateAllowance={updateAllowance} needAllowance={needAllowance}></ApproveBtn>
                <br></br>
                <Icon className={classes.arrow}>arrow_downward</Icon>
                <SwapTo></SwapTo>
              </CardContent>
            </Card>
            <ActionBtn updateProxyStatus={updateProxyStatus}></ActionBtn>
            <Order></Order>
          </OrderProvider>
        </CoinProvider>
      </ProxyProvider>
    </React.Fragment>
  );
}

export default Page;
