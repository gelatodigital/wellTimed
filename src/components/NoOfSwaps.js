import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Context
import TimeContext from '../contexts/TimeContext'


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function NoOfSwaps() {
  const classes = useStyles();

  const timeContext = useContext(TimeContext)

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
    setTime(newTime)
 };

  return (
        <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel shrink>
                No. of swaps
                </InputLabel>
                <Select
                  htmlFor="outlined-age-simple"
                  value={time.numOrders}
                  onChange={handleChange}
                  displayEmpty
                  name="numOrders"
                  className={classes.selectEmpty}
                >
                <MenuItem selected value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                </Select>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
          </FormControl>
  );
}