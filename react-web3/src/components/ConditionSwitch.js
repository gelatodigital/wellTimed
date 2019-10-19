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
        >
          <MenuItem value={true}>is greater or equal to</MenuItem>
          <MenuItem value={false}>is smaller or equal to</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
}

export default ConditionSwitch;
