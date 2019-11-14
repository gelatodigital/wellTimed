import React, {useContext, useEffect} from "react";

// Contexts
import { useWeb3Context } from "web3-react";
import ProxyContext from '../contexts/ProxyContext'

import { Button, makeStyles } from "@material-ui/core";
import { ethers } from "ethers";
import {
	GELATO_CORE
} from "../constants/contractAddresses";

// ABIs
import gelatoCoreABI from "../constants/ABIs/gelatoCore.json";


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
  const userIsRegistered = useContext(ProxyContext)
  const updateUserIsRegistered = props.updateUserIsRegistered
  const fetchExecutionClaims = props.fetchExecutionClaims

  // Run only once
  useEffect(() => {
    context.setFirstValidConnector(["MetaMask", "Infura"]);
  }, [])

  // Run as long as context is false
  useEffect(() => {
    // Fetch Past events
    fetchExecutionClaims()
  }, [context.active])

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
    switch(context.networkId)
    {
      case 3:
        checkIfUserHasProxy()

        // const fetchedRows = fetchOrderFromLocalStorage();
        // if (newProxyStatus === userIsRegistered) {
        //   if (fetchedRows === rows) { updateRows(fetchOrderFromLocalStorage) }
        // } else {
        //   updateProxyStatus(newProxyStatus)
        //   updateRows(fetchOrderFromLocalStorage)
        // }
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

      default:
        return (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              context.unsetConnector();
            }}
          >
            Ropsten Network only
          </Button>
        );
    }
  }

  async function checkIfUserHasProxy() {
    const signer = context.library.getSigner();
    const gelatoCoreAddress = GELATO_CORE[context.networkId];
		const gelatoCoreContract = new ethers.Contract(
			gelatoCoreAddress,
			gelatoCoreABI,
			signer
    );
    // IF user has a proxy => DEFAULT === FALSE
    let isUser = await gelatoCoreContract.isUser(context.account);
    if (isUser === false && userIsRegistered === true)
    {
      updateUserIsRegistered(false)
    }
    else if (isUser === true && userIsRegistered === false)
    {
      updateUserIsRegistered(true)
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
