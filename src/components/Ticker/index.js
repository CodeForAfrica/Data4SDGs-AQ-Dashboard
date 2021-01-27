import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Grid, Typography, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Status from './Status';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto',
  },
  section: {
    margin: '0 auto',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '76.125rem',
    },
    [theme.breakpoints.up('lg')]: {
      // width: '26.5rem',
    },
  },
  ticker: {
    border: '1px solid #D6D6D6',
    boxShadow: '0px 4px 4px #00000029',
    padding: '1.125rem',
    [theme.breakpoints.up('md')]: {
      padding: '1.125rem 2.625rem 1.25rem',
    },
  },
  lastUpdated: {
    color: '#9D9C9C',
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
    [theme.breakpoints.up('md')]: {
      // marginTop: '2.625rem',
    },
  },
  title: {
    textTransform: 'uppercase',
  },
}));

function Ticker({ lastUpdated, statuses, title, values, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isMobile = !useMediaQuery(theme.breakpoints.up('md'));

  if (!values) {
    return null;
  }
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.ticker}
        >
          <Grid item xs={12} container justify="space-between">
            <Grid item>
              <Typography
                variant="subtitle2"
                component="h2"
                className={classes.title}
              >
                {title}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} container className={classes.statuses}>
            {statuses.map((status, index) => (
              <Grid key={status.name} item xs={6} md={3}>
                <Status
                  {...status}
                  value={values[status.slug]}
                  classes={{
                    root: classNames(
                      classes.status,
                      {
                        [classes.statusBorderRight]: isMobile
                          ? index % 2 === 0
                          : index < statuses.length - 1,
                      },
                      { [classes.statusBorderTop]: isMobile && index > 1 },
                      { [classes.statusHighlight]: status.highlight }
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} container justify="flex-start">
            <Typography
              variant="caption"
              size="small"
              underline="none"
              className={classes.lastUpdated}
            >
              Last update: {new Date(lastUpdated).toISOString()}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

Ticker.propTypes = {
  statuses: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  lastUpdated: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  title: PropTypes.string.isRequired,
  values: PropTypes.shape({}).isRequired,
};

export default Ticker;