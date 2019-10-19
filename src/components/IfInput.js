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
  DialogActions
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

function IfInput() {
  const kyberAPIEndpoint = "https://api.kyber.network/currencies";

  const iconAPI = coin => {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${coin}/logo.png`;
  };
  async function allCoins() {
    await fetch(kyberAPIEndpoint)
      .then(result => result.json())
      .then(val => setModal({ ...state, availableCoins: val }));
  }

  const classes = useStyles();

  // State

  const [state, setModal] = React.useState({
    open: false,
    coinToLock: "",
    coinFromLock: "",
    availableCoins: [],
    amountToLock: 0,
    amountFromLock: 0
  });

  const handleChange = name => event => {
    setModal({ ...state, [name]: event.target.value || "" });
  };

  const handleClickOpen = () => {
    setModal({ ...state, open: true });
  };

  const handleClose = () => {
    setModal({ ...state, open: false });
  };

  return (
    <div>
      <Input value={state.amountToLock} />
      <Button onClick={handleClickOpen}>Choose Coin</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}
        onClose={handleClose}
      >
        <DialogTitle>Choose coin from Dropdown</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="coin-native-simple">Coin</InputLabel>
              <Select
                native
                value={state.coin}
                onChange={handleChange("coinToLock")}
                input={<Input id="coin-input" />}
              ></Select>
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

export default IfInput;
