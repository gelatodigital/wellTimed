import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

export default function Interval() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    age: '',
    name: 'hai',
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    // setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value,
    }));
  };

  return (
        <FormControl className={classes.formControl}>
            {/* <InputLabel shrink htmlFor="age-label-placeholder">
                Interval Type
            </InputLabel> */}
            <Select
                value={values.age}
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'age-label-placeholder',
                }}
                displayEmpty
                name="age"
                className={classes.selectEmpty}
                >
                <MenuItem value="">seconds</MenuItem>
                <MenuItem value={"minutes"}>minutes</MenuItem>
                <MenuItem value={"hours"}>hours</MenuItem>

            </Select>
                {/* <FormHelperText>Label + placeholder</FormHelperText> */}
        </FormControl>

  );
}