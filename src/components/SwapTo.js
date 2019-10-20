import React from "react";
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
import { coins } from "../constants/coins";
import { useWeb3Context } from "web3-react";

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

function SwapTo(props) {
  const context = useWeb3Context();
  const classes = useStyles();

  // State

  const [state, setState] = React.useState({
    open: false,
    coin: "",
    amount: 0,
    availableCoins: coins
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleClickOpen = () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const userChoice = () => {
    if (state.coin) {
            // push to parent works only here, not in handleChange
      props.activeCoin(state.coin, 'swapTo')
      return (
        <span className={classes.coins}>
          {state.coin.name}
          <img
            src={state.coin.logo()}
            alt="coin logo"
            className={classes.img}
          />
        </span>
      );
    } else {
      return <span>Choose a coin</span>;
    }
  };

  const handleAmount = name => event => {
    setState({ ...state, [name]: event.target.value || "" });
  };

  return (
    <div className={classes.container}>
      <Input
        value={state.amount}
        onChange={handleAmount("amount")}
        type="number"
        autoComplete="off"
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
                {state.availableCoins[1].map(coin => {
                  return (
                    <MenuItem
                      key={coin.id}
                      value={coin}
                      className={classes.coins}
                    >
                      {coin.name}
                      <img
                        className={classes.img}
                        src={coin.logo()}
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

export default SwapTo;
