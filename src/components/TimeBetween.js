import React, {useContext} from 'react';
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

export default function TimeBetween() {
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
    newTime.intervalTime = newNumOrders
    setTime(newTime)
 };

  return (
        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel shrink htmlFor="age-label-placeholder">
                When?
            </InputLabel>
            <Select
                htmlFor="outlined-age-simple"
                value={time.intervalTime}
                onChange={handleChange}
                displayEmpty
                name="intervalTime"
                className={classes.selectEmpty}
                >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={10}>15</MenuItem>
                <MenuItem value={20}>30</MenuItem>
                <MenuItem value={30}>45</MenuItem>
                <MenuItem value={30}>60</MenuItem>
            </Select>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
        </FormControl>

  );
}