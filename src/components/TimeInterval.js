import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
    minWidth: '90px',
    backgroundColor: 'rgb(220,220,220, 0.3)',
    borderRadius: '4px',
  },
  selectEmpty: {
    // marginTop: '1.5px',
  },
}));

export default function TimeInterval(props) {
  const classes = useStyles();

  const updateActiveCoins = props.updateActiveCoins

  const timeContext = useContext(TimeContext)
  const coinContext = useContext(CoinContext)
  const time = timeContext.time
  const setTime = timeContext.setTime


  const handleChange = event => {
    const newTime = {...time}
    newTime.intervalType = event.target.value
    const updatedCoinContext = updateEstimatedOrders(coinContext, newTime)
		updateActiveCoins(updatedCoinContext)
    setTime(newTime)
 };

  return (
        <FormControl className={classes.formControl}>
            {/* <InputLabel shrink htmlFor="age-label-placeholder">
                Interval Type
            </InputLabel> */}
            <Select
                disableUnderline={true}
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
                <MenuItem value={"minutes"}>minutes</MenuItem>
                <MenuItem value={"hours"}>hours</MenuItem>
                <MenuItem value={"days"}>days</MenuItem>

            </Select>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
        </FormControl>

  );
}