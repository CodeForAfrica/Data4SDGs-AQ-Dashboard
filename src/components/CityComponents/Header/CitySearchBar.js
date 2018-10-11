import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Select from 'react-select';

import { MenuItem, Paper, TextField, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const suggestions = [
  { value: 'nairobi', label: 'Nairobi, Kenya' },
  { value: 'lagos', label: 'Lagos, Nigeria' },
  { value: 'dar-es-salaam', label: 'Dar-es-Salaam, Tanzania' }
];

//To Do: needs to be pulled from an api
const airPollutionLevel = {
  nairobi: 17,
  lagos: 20,
  'dar-es-salaam': 18
};

const styles = theme => ({
  root: {
    [theme.breakpoints.down('md')]: {
      paddingTop: '0'
    },
    flexGrow: 1,
    height: 250,
    paddingTop: '2.5rem',
    width: '300px'
  },
  input: {
    display: 'flex',
    padding: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: theme.spacing.unit * 2,
    width: '300px'
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 18,
    color: '#164B3E',
    paddingLeft: '1rem'
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
    width: 300
  },
  css1wy0on6: {
    width: '0'
  }
});

function NoOptionsMessage({ children, innerProps, selectProps }) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.noOptionsMessage}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control({ children, innerProps, innerRef, selectProps }) {
  return (
    <TextField
      InputProps={{
        inputComponent,
        inputProps: {
          className: selectProps.classes.input,
          inputRef: innerRef,
          children,
          ...innerProps
        }
      }}
      {...selectProps.textFieldProps}
    />
  );
}

function Option({ children, innerProps, innerRef, isFocused, isSelected }) {
  return (
    <MenuItem
      buttonRef={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}

function Placeholder({ children, innerProps, selectProps }) {
  return (
    <Typography
      color="textSecondary"
      className={selectProps.classes.placeholder}
      {...innerProps}
    >
      {children}
    </Typography>
  );
}

function SingleValue({ children, innerProps, selectProps }) {
  return (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
      {children}
    </Typography>
  );
}

function ValueContainer({ children, selectProps }) {
  return <div className={selectProps.classes.valueContainer}>{children}</div>;
}

function Menu({ children, innerProps, selectProps }) {
  return (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
      {children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
  DropdownIndicator: null
};

class CitySearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { single: null };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(city) {
    this.setState({ single: city });
    this.props.history.push({
      pathname: '/air/city',
      state: {
        cityObj: city,
        cityAirPolLevel: airPollutionLevel[city.value]
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { single } = this.state;

    return (
      <div className={classes.root}>
        <Select
          classes={classes}
          options={suggestions}
          components={components}
          value={single}
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

CitySearchBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(CitySearchBar));
