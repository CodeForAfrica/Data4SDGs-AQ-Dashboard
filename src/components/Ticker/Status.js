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
  },
  status: {
    color: 'inherit',
  },
  value: {
    color: 'inherit',
    lineHeight: '6.25rem',
  },
  valueText: {
    color: '#9D9C9C',
    fontFamily: theme.typography.h3.fontFamily,
  },
}));

function Status({ name, status, value, valueText, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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
        <Typography
          variant={isDesktop ? 'h3' : isTablet ? 'h4' : 'h5'}
          className={classes.value}
        >
          {value.toLocaleString()}
        </Typography>
        {valueText?.length ? (
          <Typography
            variant="caption"
            size="small"
            className={classes.valueText}
          >
            {valueText}
          </Typography>
        ) : null}
      </Grid>
    </Grid>
  );
}

Status.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  valueText: PropTypes.string,
};

Status.defaultProps = {
  valueText: undefined,
};

export default Status;
