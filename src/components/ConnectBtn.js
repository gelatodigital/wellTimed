import React from "react";
import { useWeb3Context } from "web3-react";
import { Button, makeStyles } from "@material-ui/core";
import { ethers } from "ethers";
import { DS_PROXY_REGISTRY } from "../constants/contractAddresses";

// ABIs
import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";
import dsProxyABI from "../constants/ABIs/ds-proxy.json";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "20px 10px"
  }
}));

function ConnectBtn(props) {
  const classes = useStyles();
  const context = useWeb3Context();

  const updateProxyStatus = props.updateProxyStatus
  // Used for checking if user has a proxy + guard contract(3), proxy contract (2), or no proxy contract at all (1) - default (0)
  const [proxyStatus, setProxyStatus] = React.useState(0);

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
        Disconnect
      </Button>
    );
  }

  async function checkIfUserHasProxy() {
    const signer = context.library.getSigner();
    const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId];
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
      updateProxyStatus(1)
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
      // Also check past events if user deployed guard at some point

      if (guardAddress === ethers.constants.AddressZero) {
        console.log(
          "No guard contract found as proxy authority, please 1) deploy guard and 2) set as authority"
        );
        // setProxyStatus(2);
        updateProxyStatus(2)
      } else {
        console.log(`Guard contract found - address: ${guardAddress}`);
        console.log("Set Guard as authority");
        updateProxyStatus(3)
        // setProxyStatus(3);
      }
    }
  }

  return (
    <React.Fragment>
      {(context.active || (context.error && context.connectorName)) && (
        <div className={classes.root}>
          <LogOut></LogOut>
        </div>
      )}
      {!context.active && (
        <div className={classes.root}>
          <LogIn></LogIn>
        </div>
      )}
    </React.Fragment>
  );
}

export default ConnectBtn;
