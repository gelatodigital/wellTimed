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
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

function IfInput() {
  const coinOptions = [];

  const kyberAPIEndpoint = "https://api.kyber.network/currencies";

  const iconAPIEndpoint = async coin => {
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${coin}/logo.png`;
  };

  async function allCoins() {
    await fetch(kyberAPIEndpoint)
      .then(result => result.json())
      .then(val => setModal({ ...modal, availableCoins: val }));
  }

  const createOptions = async function () {
    console.log(coinOptions);
    await allCoins();
    for (let option of modal.availableCoins.data) {
      coinOptions.push(
        <option>
          {option.name}
          <img src={iconAPIEndpoint(option.id)} alt="coin logo" />
        </option>
      );
    }
  }

  const classes = useStyles();

  // State

  const [modal, setModal] = React.useState({
    open: false,
    coin: "",
    availableCoins: []
  });

  const handleChange = name => event => {
    setModal({ ...modal, [name]: Number(event.target.value) || "" });
  };

  const handleClickOpen = () => {
    setModal({ ...modal, open: true });
  };

  const handleClose = () => {
    setModal({ ...modal, open: false });
  };

  return (
    <div>
      <span>
        <Input />
        <Button onClick={handleClickOpen}>Open select dialog</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={modal.open}
          onClose={handleClose}
        >
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Coin</InputLabel>
                <Select
                  native
                  value={modal.coin}
                  onChange={handleChange("coin")}
                  input={<Input id="coin-input" />}
                >
                  {coinOptions}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </span>
    </div>
  );
}

export default IfInput;
