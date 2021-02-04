import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 10px',
  },
  section: {
    margin: '0 10px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      //   width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      //   width: '76.125rem',
      width: '33vw',
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
  subtitle: {
    color: '#5D5C5C',
    fontFamily: theme.typography.h3.fontFamily,
    textTransform: 'uppercase',
  },
  chartContainer: {
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

function Chart({ title, subtitle, description, chartSrc, ...props }) {
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
          <Grid>
            <Typography variant="h5" component="h2" className={classes.title}>
              {title}
            </Typography>
            <Typography
              variant="subtitle2"
              component="h3"
              className={classes.subtitle}
            >
              {subtitle}
            </Typography>
          </Grid>
          <Grid item xs={12} container className={classes.chartContainer}>
            <iframe
              className={classes.chartStyles}
              title="chart"
              src={chartSrc}
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

Chart.propTypes = {
  description: PropTypes.string,
  subtitle: PropTypes.string,
  title: PropTypes.string,
  chartSrc: PropTypes.string,
};

Chart.defaultProps = {
  description: undefined,
  subtitle: undefined,
  title: undefined,
  chartSrc: undefined,
};

export default Chart;
