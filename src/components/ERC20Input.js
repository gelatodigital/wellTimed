import React, { useContext } from "react";
import {
  Input,
  Button,
  DialogTitle,
  Dialog,

  makeStyles,
  MenuItem
} from "@material-ui/core";

import { ethers } from "ethers";

// Contexts
import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import TimeContext from "../contexts/TimeContext";

// Helpers
import { getCorrectImageLink } from "../helpers";
import { updateEstimatedOrders } from "../helpers";

const useStyles = makeStyles(theme => ({
  root: {
    // width: '32px'
    fontFamily: 'Cantarell, sans-serif',
  },
  container: {
    display: "flex",
    justifyContent: "center",
    paddingLeft: '5px',
    paddingRight: '10px',


  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,

  },
  amountInput: {
    // marginTop: '2px',
    width: '130px',
    backgroundColor: 'rgb(220,220,220, 0.3)',
    height: '35px',
    marginRight: '10px',
    borderRadius: '4px',

  },
  input: {
    textAlign: 'right',
    padding: '0'
    // borderRadius: '4px'
  },

  coins: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
    // paddingTop: '6px',
    // backgroundColor: 'pink',

  },
  buttonPadding: {
    // marginTop: '1.5px',
    minWidth: '32px',
    height: '35px',
    backgroundColor: 'rgb(220,220,220, 0.3)',
    // paddingTop: '15px'
  },
  img: {
    width: "24px",
    height: "24px",
    marginLeft: '3px'
  },
}));

function ERC20Input(props) {
  const context = useWeb3Context();
  const classes = useStyles();
  const coinContext = useContext(CoinContext);
  const timeContext = useContext(TimeContext)
  const time = timeContext.time
  const updateActiveCoins = props.updateActiveCoins

  // State
  const [state, setState] = React.useState({
    open: false,
    availableCoins: Object.values(getCorrectImageLink(context.networkId))
  });

  const handleChange = coin => {

    setState({ ...state, open: false });
    coinContext.actionFrom = coin;
    const updatedCoinContext = updateEstimatedOrders(coinContext, time)
		updateActiveCoins(updatedCoinContext)
  };

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const userChoice = () => {
    if (coinContext.actionFrom) {
      return (
        <span className={classes.coins}>
          {coinContext.actionFrom.symbol}
          <img
            src={coinContext.actionFrom.logo(ethers.utils.getAddress(coinContext.actionFrom.mainnet))}
            alt="logo"
            className={classes.img}
          />
        </span>
      );
    } else {

      return  (<span className={classes.coins}>
        {"MANA"}
        <img
          src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0F5D2fB29fb7d3CFeE444a200298f468908cC942/logo.png"}
          alt="coin logo"
          className={classes.img}
        />
      </span>)


    }


  };

  const handleAmount = name => event => {
    const decimals = coinContext.actionFrom.decimals
    let value = event.target.value
    if (value === "") {
      coinContext.amountActionFrom = 0;
    } else {
      const selectedAmount = ethers.utils.parseUnits(value, decimals)
      coinContext.amountActionFrom = selectedAmount;
    }
    const updatedCoinContext = updateEstimatedOrders(coinContext, time)
		updateActiveCoins(updatedCoinContext)
    // checkERC20ApprovalStatus()
  };


  return (
    <div className={classes.container}>
      <Input
        className={classes.amountInput}
        classes={{
          input: classes.input,
        }}
        inputProps={{ min: 0 }}
        disableUnderline={true}
        onChange={handleAmount("amount")}
        type="number"
        autoComplete="off"
        defaultValue="1"
        // value={renderDefaultValue()}

      />
      <Button
        className={classes.buttonPadding}
        // color={state.coin ? "primary" : "secondary"}
        // color={state.coin ? "primary" : "secondary"}
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
        value={coinContext.actionFrom}
        // onChange={handleChange("coin")}
      >
        <DialogTitle>Choose Token to sell</DialogTitle>
        {/* <Select value={state.coin} onChange={handleChange("coin")} onClick={console.log("click")} > */}
        {/* // <div value={state.coin} onChange={handleChange("coin")}> */}
        {state.availableCoins.map((coin, key) => {
          return (
            <div key={key+10}>
              <div key={key+100} style={{marginTop: '4px', marginBottom: '4px', borderBottom: '1px solid rgb(220,220,220, 1)'}}></div>
              <MenuItem
                // onChange={handleChange("coin")}
                // onClick={handleClose}
                onClick={() => {
                  handleChange(coin);
                }}
                key={key}
                value={coin}
                className={classes.coins}
              >
                {coin.symbol}
                <img
                  className={classes.img}
                  src={coin.logo(coin.mainnet)}
                  alt="coin logo"
                />
              </MenuItem>
            </div>
          );
        })}
      </Dialog>
    </div>
  );
}

export default ERC20Input;
