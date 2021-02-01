import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles({
  root: {
    maxWidth: 240,
  },
});

export default function BasicSelect({ onChange }) {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div className={classes.root}>
      <FormControl fullWidth>
        <InputLabel id="particles-select-label">Particulate Matter</InputLabel>
        <Select
          labelId="particles-select-label"
          id="particles-select"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value='{"yName":"P1","yLabel":"PM10"}'>PM10</MenuItem>
          <MenuItem value='{"yName":"P2","yLabel":"PM2.5"}'>PM2.5</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
