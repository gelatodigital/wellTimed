import React, { useEffect } from "react";
// web3 library
import { ethers } from "ethers";
// Context so we access the users account & provider
import { useWeb3Context, Connectors } from "web3-react";

// Import ABIs
import dummyContractABI from "../constants/ABIs/dummyContract.json";
import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";
import dsProxyABI from "../constants/ABIs/ds-proxy.json";

// Import addresses
import { addresses } from "../constants/contractAddresses";
import { AbiCoder } from "ethers/utils";

// Material
import Button from "@material-ui/core/Button";

function MyComponent() {
  const context = useWeb3Context();

  // State
  const [loading, setLoading] = React.useState(false);

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

  function ActionButton() {
    switch (proxyStatus) {
      case 1:
        return (
          <Button
            disabled={loading}
            variant="contained"
            color="primary"
            onClick={deployProxy}
          >
            Create Account
          </Button>
        );

      case 2:
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={deployAndSetGuard}
          >
            Whitelist our relayer
          </Button>
        );

      case 3:
        return (
          <Button variant="contained" color="primary" onClick={placeOrder}>
            Place Order
          </Button>
        );

      default:
        return (
          <Button variant="contained" color="primary" onClick={placeOrder}>
            Place Order
          </Button>
        );
    }
  }

  function LogIn() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          context.setFirstValidConnector(["MetaMask", "Infura"]);
        }}
      >
        Connect Metamask
      </Button>
    );
  }

  function LogOut() {
    checkIfUserHasProxy();
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          context.unsetConnector();
        }}
      >
        Deactivate
      </Button>
    );
  }

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

  async function checkIfUserHasProxy() {
    const signer = context.library.getSigner();
    const proxyRegistryAddress = addresses["ds-proxy-registry"];
    const proxyRegistryContract = new ethers.Contract(
      proxyRegistryAddress,
      proxyRegistryABI,
      signer
    );
    let proxyAddress = await proxyRegistryContract.proxies(context.account);
    if (proxyAddress === ethers.constants.AddressZero) {
      console.log(
        "No proxy found, please deploy proxy through registry + deploy associated guard through guard registry"
      );
      setProxyStatus(1);
      // Deploy Proxy
      // Deploy Guard
    } else {
      console.log(`Proxy exists - Address: ${proxyAddress}`);
      // fetch proxy
      const proxyContract = new ethers.Contract(
        proxyAddress,
        dsProxyABI,
        signer
      );
      // Check if proxy has guard / authority
      let guardAddress = await proxyContract.authority();
      if (guardAddress === ethers.constants.AddressZero) {
        console.log(
          "No guard contract found, please 1) deploy guard and 2) set as authority"
        );
        setProxyStatus(2);
      } else {
        console.log(`Guard contract found - address: ${guardAddress}`);
        console.log("Set Guard as authority");
        setProxyStatus(3);
      }
    }
  }

  async function deployProxy() {
    const signer = context.library.getSigner();
    const dummyContractAddress = addresses["dummy"];
    const dummyContract = new ethers.Contract(
      dummyContractAddress,
      dummyContractABI,
      signer
    );
    // Get the current value
    let currentValue = await dummyContract.counter();
    console.log(`Current Value: ${currentValue}`);
    setLoading(true)
    await dummyContract.increment();
    currentValue = await dummyContract.counter();
    console.log(`Current Value: ${currentValue}`);
   setLoading(false)
  }

  async function deployAndSetGuard() {
    console.log("Test 2");
  }

  async function placeOrder() {
    console.log("Test 3");
  }
  // async function sendTxExample() {
  //     const dummyContractAddress = addresses['dummy']
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
      <h1>Web3 React Demo Shit</h1>
      <h3>Trying out Metamask Logins / Logouts</h3>
      {/* Render LogIn / LogOut Button */}
      {/* {context.active ? (<IsLoggedIn/>) : (<IsLoggedOut/>)} */}
      {(context.active || (context.error && context.connectorName)) && (
        <div>
          <LogOut></LogOut>
          <h4>Your Address: {context.account}</h4>

          {!waitingForTX && <ActionButton></ActionButton>}
          {waitingForTX && <button> Please wait ...</button>}
          {transactionHash && <p>Tx Hash: {transactionHash}</p>}
        </div>
      )}
      {!context.active && (
        <div>
          <LogIn></LogIn>
        </div>
      )}
    </React.Fragment>
  );
}

export default MyComponent;
