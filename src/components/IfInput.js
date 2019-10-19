import React, { useEffect } from "react";
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

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
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

function IfInput() {
  const classes = useStyles();

  // State

  const [state, setModal] = React.useState({
    open: false,
    coin: "",
    availableCoins: coins
  });

  const handleChange = name => event => {
    // setModal({ availableCoins: props.value });
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
              <Select value={state.coin} onChange={handleChange("coin")}>
                {state.availableCoins[1].map(coin => {
                  return (
                    <MenuItem key={coin.id} value={coin.name} className={classes.coins}>
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

export default IfInput;
