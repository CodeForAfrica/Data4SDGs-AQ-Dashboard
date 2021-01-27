import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: theme.palette.primary.main,
    textAlign: 'center',
  },
  name: {
    color: 'inherit',
    // textTransform: 'none',
  },
  status: {
    color: 'inherit',
  },
  value: {
    color: 'inherit',
    lineHeight: '6.25rem',
  },
}));

function Status({ name, status, value, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography
          variant="caption"
          component={isDesktop ? 'h4' : 'h5'}
          className={classes.status}
        >
          {status}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="button"
          component={isDesktop ? 'h4' : 'h5'}
          className={classes.name}
        >
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={isDesktop ? 'h3' : 'h5'} className={classes.value}>
          {value.toLocaleString()}
        </Typography>
      </Grid>
    </Grid>
  );
}

Status.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

export default Status;
