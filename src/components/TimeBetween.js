import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { ethers } from "ethers";

// Helpers
import { updateEstimatedOrders } from "../helpers";


// Context
import TimeContext from '../contexts/TimeContext'
import CoinContext from '../contexts/CoinContext'


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
    marginTop: '1.5px',
  },
}));

export default function TimeBetween(props) {
  const classes = useStyles();

  const updateActiveCoins = props.updateActiveCoins

  const timeContext = useContext(TimeContext)
  const coinContext = useContext(CoinContext)

  const time = timeContext.time
  const setTime = timeContext.setTime

  const handleChange = event => {
    const newTime = {...time}
    let  newIntervalTime = event.target.value
    console.log(newIntervalTime)
    newTime.intervalTime = newIntervalTime
    const updatedCoinContext = updateEstimatedOrders(coinContext, newTime)
		updateActiveCoins(updatedCoinContext)
    setTime(newTime)
  };


  function renderDefaultValue() {
    return time.intervalTime;
    }

    function changeOrderDetails(newIntervalTime) {
      // Change coinContext Orders
      const actionSellToken = coinContext["actionFrom"]
      const actionSellTokenSymbol = coinContext["actionFrom"]["symbol"];
      const actionBuyTokenSymbol = coinContext["actionTo"]["symbol"]
      const actionSellAmount = coinContext["amountActionFrom"];
      let sellAmountPerSubOrder =  ethers.utils.bigNumberify(actionSellAmount).div(ethers.utils.bigNumberify(time.numOrders))
      let newOrders = []
      const decimals = coinContext.actionFrom.decimals
      let userfriendlyAmountPerSubOrder = ethers.utils.formatUnits(sellAmountPerSubOrder, decimals)

      for (let i = 0; i < time.numOrders; i++)
      {
        let timestamp = coinContext['timestamp'] + (i * newIntervalTime)
        let date1 = new Date(timestamp);
        let timestampString1 = `${date1.toLocaleDateString()} - ${date1.toLocaleTimeString()}`;
        let order = {swap: `${parseFloat(userfriendlyAmountPerSubOrder).toFixed(4)} ${actionSellTokenSymbol} => ${actionBuyTokenSymbol}`, when: `${timestampString1}`}
        newOrders.push(order)
      }

      coinContext.orders = newOrders;
      updateActiveCoins(coinContext)
    }

 function renderDefaultValue() {
  return time.intervalTime;
  }

  return (
        <FormControl  className={classes.formControl}>
            {/* <InputLabel shrink htmlFor="age-label-placeholder">
                When?
            </InputLabel> */}
            <Select
                htmlFor="outlined-age-simple"
                value={time.intervalTime}
                onChange={handleChange}
                name="intervalTime"
                className={classes.selectEmpty}
                displayEmpty={true}
                renderValue={renderDefaultValue}
                disableUnderline={true}
                >

                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={21}>21</MenuItem>
                <MenuItem value={22}>22</MenuItem>
                <MenuItem value={23}>23</MenuItem>
                <MenuItem value={24}>24</MenuItem>


            </Select>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
        </FormControl>

  );
}