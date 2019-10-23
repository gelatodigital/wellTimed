import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

export default function TimeInterval() {
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
    newTime.intervalType = newNumOrders
    setTime(newTime)
 };

  return (
        <FormControl  variant="outlined" className={classes.formControl}>
            {/* <InputLabel shrink htmlFor="age-label-placeholder">
                Interval Type
            </InputLabel> */}
            <Select
                htmlFor="outlined-age-simple"
                value={time.intervalType}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-label-placeholder',
                }}
                displayEmpty
                name="age"
                className={classes.selectEmpty}
                >
                <MenuItem value={"seconds"}>seconds</MenuItem>
                <MenuItem value={"minutes"}>minutes</MenuItem>
                <MenuItem value={"hours"}>hours</MenuItem>

            </Select>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
        </FormControl>

  );
}