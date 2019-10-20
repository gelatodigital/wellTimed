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
import { useWeb3Context } from "web3-react";
import CoinContext from "../contexts/CoinContext";
import { getCorrectImageLink } from "../helpers";

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

function LockFrom() {
  const context = useWeb3Context();
  const classes = useStyles();
  const coinContext = useContext(CoinContext);

  // State

  const [state, setState] = React.useState({
    open: false,
    coin: "",
    amount: 0,
    availableCoins: Object.values(getCorrectImageLink())
  });

  const handleChange = name => event => {
    const newState = { ...state };
    newState[name] = event.target.value;
    setState({ ...state, [name]: event.target.value });
    coinContext.triggerFrom = event.target.value;
  };

  const handleClickOpen = async () => {
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
      return (<span className={classes.coins}>
      {"Kyber Network"}
      <img
        src={"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdd974d5c2e2928dea5f71b9825b8b646686bd200/logo.png"}
        alt="coin logo"
        className={classes.img}
      />
    </span>)
    }
  };

  const handleAmount = name => event => {
    setState({ ...state, [name]: event.target.value || "" });
    coinContext.amountTriggerFrom = event.target.value;
    console.log(coinContext);
  };

  return (
    <div className={classes.container}>
      <Input
        onChange={handleAmount("amount")}
        type="number"
        autoComplete="off"
        placeholder="100"
      />
      <Button
        color={state.coin ? "primary" : "secondary"}
        onClick={handleClickOpen}
      >
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

export default LockFrom;
