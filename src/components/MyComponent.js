import React from "react";
import IfInput from "./IfInput";
import ConditionialSwitch from "./ConditionSwitch";
// web3 library
import { ethers } from "ethers";
// Context so we access the users account & provider
import { useWeb3Context } from "web3-react";

import { Icon, Card, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  card: {
    margin: "90px;"
  }
}));

function MyComponent() {
  const context = useWeb3Context();
  const classes = useStyles();

  // State
  console.log(context);

  // Used to display tx hash
  const [transactionHash, setTransactionHash] = React.useState(undefined);
  // Used for reacting to successfull txs
  const [waitingForTX, setWaitingForTX] = React.useState(false);
  // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
  const [proxyStatus, setProxyStatus] = React.useState(0);

  // If we want to activate metamask when the page loads, we need to use useEffect()
  // useEffect(() => {
  //     console.log("effect")

  // }, [])

  function sendDummyTransaction() {
    const signer = context.library.getSigner();
    console.log("Sending Tx");

    // For Button loader
    setWaitingForTX(true);

    signer
      .sendTransaction({
        to: ethers.constants.AddressZero,
        value: ethers.utils.bigNumberify("0")
      })
      .then(({ hash }) => {
        setTransactionHash(hash);
        setWaitingForTX(false);
      });
  }

  async function deployProxy() {
    console.log("Test 1");
    // const signer = context.library.getSigner()
    // const dummyContractAddress = DS_PROXY_REGISTRY[context.networkId]
    // const dummyContract = new ethers.Contract(dummyContractAddress, dummyContractABI, signer);
    // // Get the current value
    // let currentValue = await dummyContract.counter();
    // console.log(`Current Value: ${currentValue}`);
    // await dummyContract.increment();
    // currentValue = await dummyContract.counter();
    // console.log(`Current Value: ${currentValue}`);
  }

  async function deployAndSetGuard() {
    console.log("Test 2");
  }

  async function placeOrder() {
    console.log("Test 3");
  }
  // async function sendTxExample() {
  //     const dummyContractAddress = DS_PROXY_REGISTRY[context.networkId]
  //     const signer = context.library.getSigner();
  //     const dummyContract = new ethers.Contract(dummyContractAddress, dummyContractABI, signer);
  //     // Get the current value
  //     let currentValue = await dummyContract.counter();
  //     console.log(`Current Value: ${currentValue}`);
  //     await dummyContract.increment();
  //     currentValue = await dummyContract.counter();
  //     console.log(`Current Value: ${currentValue}`);
  // }

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardContent>
          <h1>Swap tokens depending on conditions</h1>
          <IfInput></IfInput>
          <ConditionialSwitch></ConditionialSwitch>
          <IfInput></IfInput>
        </CardContent>
      </Card>
      <Icon>arrow_downward</Icon>
      <Card className={classes.card}>
        <CardContent>
          <IfInput></IfInput>
          <Icon>arrow_downward</Icon>
          <IfInput></IfInput>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

export default MyComponent;
