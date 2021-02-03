import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
  },
  section: {
    margin: '0 auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '76.125rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  ticker: {
    border: '1px solid #D6D6D6',
    boxShadow: '0px 4px 4px #00000029',
    marginTop: '1rem',
    padding: '1.125rem',
    [theme.breakpoints.up('md')]: {
      padding: '1.125rem 2.625rem 1.25rem',
    },
  },
  lastUpdated: {
    color: '#9D9C9C',
  },
  subtitle: {
    color: '#5D5C5C',
    fontFamily: theme.typography.h3.fontFamily,
    textTransform: 'uppercase',
  },
  status: {},
  statusBorderRight: {
    borderRight: '1px solid #D6D6D6',
  },
  statusBorderTop: {
    borderTop: '1px solid #D6D6D6',
    paddingTop: '1rem',
  },
  statusHighlight: {
    color: theme.palette.secondary.main,
  },
  statuses: {
    marginTop: '1.125rem',
  },
  title: {
    textTransform: 'uppercase',
  },
  chartStyles: {
    border: 0,
    width: '100%',
    height: '40vh',
  },
}));

function TimeSeries({ description, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.ticker}
        >
          <Grid item xs={12} container className={classes.statuses}>
            <iframe
              className={classes.chartStyles}
              title="that "
              src="https://dev.pesayetu.pesacheck.org/embed/level1-KE_1_047/section-768KuR/chart-zsjQNF"
            />
          </Grid>
          <Typography variant="subtitle2" component="h3">
            {description}
          </Typography>
        </Grid>
      </div>
    </div>
  );
}

TimeSeries.propTypes = {
  description: PropTypes.string,
};

TimeSeries.defaultProps = {
  description: undefined,
};

export default TimeSeries;
