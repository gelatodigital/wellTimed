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
    minWidth: 60,
  },
  selectEmpty: {
    marginTop: '1.5px'
  },
}));

export default function TimeInterval() {
  const classes = useStyles();

  const timeContext = useContext(TimeContext)

  const time = timeContext.time
  const setTime = timeContext.setTime

  const handleChange = event => {
    const newTime = {...time}
    newTime.intervalType = event.target.value
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
                <MenuItem value={"seconds"}>days</MenuItem>

            </Select>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
        </FormControl>

  );
}