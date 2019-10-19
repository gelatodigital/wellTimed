import React, { useEffect } from "react";

// Import Components
import IfInput from "./IfInput";
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

import {coins} from '../constants/coins'
import { AbiCoder } from "ethers/utils";
import { REPLACEMENT_UNDERPRICED } from "ethers/errors";

import { Icon, makeStyles, Card, CardContent } from "@material-ui/core";

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

  // Used to display tx hash
  const [transactionHash, setTransactionHash] = React.useState(undefined);
  // Used for reacting to successfull txs
  const [waitingForTX, setWaitingForTX] = React.useState(false);
  // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
  const [proxyStatus, setProxyStatus] = React.useState(0);

  async function updateProxyStatus(newProxyStatus) {
    console.log(`Setting new Proxy Status in Page.js`);
    console.log(`${newProxyStatus}`);
    setProxyStatus(newProxyStatus);
  }

  function getCorrectImageLink() {


    const table1 = {}
    const table2 = {}
    coins[3].forEach(coin => {
      table1[coin['symbol']] = coin
    })
    coins[1].forEach(coin => {
      table2[coin['symbol']] = coin['logo']
    })

    const table3 = {}
    for(let key in table1)
    {
      for(let key2 in table2)
      {
        if (key === key2)
        {

          table1[key]['logo'] = table2[key2]
          table3[table1[key]['address']] = table1[key]
        }
      }

    }
    return table3
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
        <ConnectBtn updateProxyStatus={updateProxyStatus} />
        <h1>Swap tokens depending on conditions</h1>
        <Card className={classes.card}>
          <CardContent>
            <IfInput></IfInput>
            <ConditionialSwitch></ConditionialSwitch>
            <IfInput></IfInput>
          </CardContent>
        </Card>
        <Icon>arrow_downward</Icon>
        <Card className={classes.card}>
          <CardContent>
            <IfInput></IfInput>
            <Icon className={classes.arrow}>arrow_downward</Icon>
            <IfInput></IfInput>
          </CardContent>
        </Card>
        <ActionBtn></ActionBtn>
      </ProxyProvider>
    </React.Fragment>
  );
}

export default Page;
