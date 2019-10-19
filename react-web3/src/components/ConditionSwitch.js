import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function ConditionSwitch() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    bigger: false
  });

  /*  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []); */

  const handleChange = event => {
    setValues(oldValues => ({
      ...oldValues,
      bigger: event.target.value
    }));
  };

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel>Set condition</InputLabel>
        <Select
          value={values.bigger}
          onChange={handleChange}
          inputProps={{
            bigger: false
          }}
        >
          <MenuItem value={values.bigger = false}>is greater or equal to</MenuItem>
          <MenuItem value={values.bigger = true}>is smaller or equal to</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}

export default ConditionSwitch;
