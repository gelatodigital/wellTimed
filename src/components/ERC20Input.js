import React, { useContext } from "react";
import {
  Input,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  makeStyles,
  FormControl,
  InputLabel,
  Select,
  DialogActions,
  MenuItem
} from "@material-ui/core";

import { ethers } from "ethers";
import proxyRegistryABI from "../constants/ABIs/proxy-registry.json";

import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import { getCorrectImageLink } from "../helpers";
import ApproveBtn from './ApproveBtn'
import { getTokenBalance, getTokenAllowance } from "../helpers";
import { DS_PROXY_REGISTRY } from "../constants/contractAddresses";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  img: {
    width: "24px",
    height: "24px"
  },
  coins: {
    display: "flex",
    justifyContent: "space-between"
  }
}));

function ERC20Input(props) {
  const context = useWeb3Context();
  const classes = useStyles();
  const coinContext = useContext(CoinContext);

  const updateAllowance = props.updateAllowance
  const needAllowance = props.needAllowance
  // State

  const [state, setState] = React.useState({
    open: false,
    coin: "",
    amount: 0,
    availableCoins: Object.values(getCorrectImageLink())
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value || "" });
    coinContext.actionFrom = event.target.value;
  };

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const userChoice = () => {
    if (state.coin) {
      return (
        <span className={classes.coins}>
          {state.coin.name}
          <img
            src={state.coin.logo(state.coin.mainnet)}
            alt="coin logo"
            className={classes.img}
          />
        </span>
      );
    } else {
      return  (<span className={classes.coins}>
        {"Chain Link"}
        <img
          src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x514910771af9ca656af840dff83e8264ecf986ca/logo.png"}
          alt="coin logo"
          className={classes.img}
        />
      </span>)
    }
  };

  const handleAmount = name => event => {
    setState({ ...state, [name]: event.target.value || "" });
    coinContext.amountActionFrom = event.target.value;
    displayApproveBtn()
  };

  async function displayApproveBtn() {
    // check if context has an actionFrom
    if (context.active)
    {
      if (coinContext['actionFrom']['address']) {
        let sellTokenAddress = coinContext['actionFrom']['address'];

        // Check balance
        const signerAddress = context.account;
        const signer = context.library.getSigner();
        let sellTokenBalance = await getTokenBalance(sellTokenAddress, signer, signerAddress)


        console.log(`SellTokenBalance: ${sellTokenBalance}`)

        if (parseInt(sellTokenBalance) !== 0)
        {
          // Check if proxy is approved
          const proxyRegistryAddress = DS_PROXY_REGISTRY[context.networkId];
          const proxyRegistryContract = new ethers.Contract(
            proxyRegistryAddress,
            proxyRegistryABI,
            signer
          );
          const proxyAddress = await proxyRegistryContract.proxies(
            context.account)

          let sellAmount = coinContext['amountActionFrom']
          if (sellAmount && parseInt(sellAmount) > 0)
          {
            let sellTokenAllowance = await getTokenAllowance(
              sellTokenAddress,
              proxyAddress,
              signer,
              context.account
            );
            console.log(`SellTokenAllowance: ${sellTokenAllowance}`)

            if (parseInt(sellTokenAllowance) < parseInt(sellAmount))
            {
              // Render approve button
              updateAllowance(true)

            }

          }
          else {
            updateAllowance(false)
          }


        } else {
          updateAllowance(false)
        }
      }

    }
  }

  return (
    <div className={classes.container}>
      <Input
        onChange={handleAmount("amount")}
        type="number"
        autoComplete="off"
        placeholder="Set the amount"
      />
      <Button
        color={state.coin ? "primary" : "secondary"}
        onClick={handleClickOpen}
      >
        {" "}
        {userChoice()}
      </Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}
        onClose={handleClose}
      >
        <DialogTitle>Choose coin from dropdown</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="coin-native-simple">Coin</InputLabel>
              <Select value={state.coin} onChange={handleChange("coin")}>
                {state.availableCoins.map(coin => {
                  return (
                    <MenuItem
                      key={coin.id}
                      value={coin}
                      className={classes.coins}
                    >
                      {coin.name}
                      <img
                        className={classes.img}
                        src={coin.logo(coin.mainnet)}
                        alt="coin logo"
                      />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ERC20Input;
