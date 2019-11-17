import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Context
import TimeContext from '../contexts/TimeContext'
import CoinContext from "../contexts/CoinContext";

// Helpers
import { updateEstimatedOrders } from "../helpers";


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
    backgroundColor: 'rgb(220,220,220, 0.3)',
    borderRadius: '4px',
  },
  selectEmpty: {
    // marginTop: '2px',
    // backgroundColor: 'rgb(220,220,220, 0.3)',
    // borderRadius: '4px',
  },
}));

export default function NoOfSwaps(props) {
  const classes = useStyles();
  const updateActiveCoins = props.updateActiveCoins

  const timeContext = useContext(TimeContext)
  const coinContext = useContext(CoinContext);

  const time = timeContext.time
  const setTime = timeContext.setTime

  const handleChange = event => {
    const newTime = {...time}
    let newNumOrders = event.target.value
    newTime.numOrders = newNumOrders
    const updatedCoinContext = updateEstimatedOrders(coinContext, newTime)
		updateActiveCoins(updatedCoinContext)
    setTime(newTime)
 };

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