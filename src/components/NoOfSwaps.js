import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ethers } from "ethers";

// Context
import TimeContext from '../contexts/TimeContext'
import CoinContext from "../contexts/CoinContext";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
    marginTop: '28px'

  },
  selectEmpty: {
    marginTop: '2px',
  },
}));

export default function NoOfSwaps() {
  const classes = useStyles();

  const timeContext = useContext(TimeContext)
  const coinContext = useContext(CoinContext);

  const time = timeContext.time
  const setTime = timeContext.setTime

  const handleChange = event => {
    const newTime = {...time}
    let newNumOrders
    if (event.target.value === "")
    {
      newNumOrders = 1
    }
    else {
      newNumOrders = event.target.value
    }
    newTime.numOrders = newNumOrders
    changeOrderDetails(newNumOrders)
    setTime(newTime)
 };

 function changeOrderDetails(newNumOrders = 2) {
   console.log(newNumOrders)
  // Change coinContext Orders
  let newIntervalTime = time.intervalTime * 86400000
  const actionSellToken = coinContext["actionFrom"]
  const actionSellTokenSymbol = coinContext["actionFrom"]["symbol"];
  const actionBuyTokenSymbol = coinContext["actionTo"]["symbol"]
  const actionSellAmount = coinContext["amountActionFrom"];
  console.log(actionSellAmount.toString())

  let sellAmountPerSubOrder =  actionSellAmount.div(ethers.utils.bigNumberify(newNumOrders))
  let newOrders = []
  const decimals = coinContext.actionFrom.decimals
  let userfriendlyAmountPerSubOrder = ethers.utils.formatUnits(sellAmountPerSubOrder, decimals)
  console.log(userfriendlyAmountPerSubOrder)
  console.log(parseInt(userfriendlyAmountPerSubOrder).toFixed(4))

  for (let i = 0; i < newNumOrders; i++)
  {
    let timestamp = coinContext['timestamp'] + (i * newIntervalTime)
    let date1 = new Date(timestamp);
    let timestampString1 = `${date1.toLocaleDateString()} - ${date1.toLocaleTimeString()}`;
    let order = {swap: `${parseFloat(userfriendlyAmountPerSubOrder).toFixed(4)} ${actionSellTokenSymbol} => ${actionBuyTokenSymbol}`, when: `${timestampString1}`}
    newOrders.push(order)
  }

  coinContext.orders = newOrders;
  console.log(coinContext)
}

 function renderDefaultValue() {
   return time.numOrders;
 }

  return (
        <FormControl className={classes.formControl}>
                {/* <InputLabel shrink>
                No. of swaps
                </InputLabel> */}
                <Select
                  disableUnderline={true}
                  htmlFor="outlined-age-simple"
                  value={time.numOrders}
                  onChange={handleChange}
                  name="numOrders"
                  className={classes.selectEmpty}
                  // placeholder={`${time.numOrders}`}
                  displayEmpty={true}
                  renderValue={renderDefaultValue}
                >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                </Select>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
          </FormControl>
  );
}