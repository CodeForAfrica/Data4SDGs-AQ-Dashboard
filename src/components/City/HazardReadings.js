import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  country: {
    margin: '3.125rem 0',
    [theme.breakpoints.down('xs')]: {
      margin: '0.625rem',
    },
    [theme.breakpoints.down('md')]: {
      margin: '0.625rem',
    },
  },
  hazardContainer: {},
  textStyle: {
    display: 'flex',
    justifyContent: 'space-between',
    textTransform: 'capitalize',
    marginLeft: '4rem',
    marginRight: '4rem',
  },
  title: {
    marginBottom: '4rem',
    fontWeight: 'bold',
  },
}));

function HazardReading({ data, hazardReading }) {
  const classes = useStyles();
  return (
    <>
      <Grid lg={6}>
        <Typography className={classes.title}>
          {' '}
          Most Hazardous Readings in Africa
        </Typography>
        <Grid>
          <Grid className={classes.country}>
            <Typography variant="body2" className={classes.textStyle}>
              1. {data[data.length - 1].name} -{' '}
              {parseFloat(
                data[data.length - 1].data[hazardReading.name]
              ).toFixed(2)}{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'green' }} />
              </svg>
            </Typography>
          </Grid>
          <Grid className={classes.country}>
            <Typography variant="body2" className={classes.textStyle}>
              2. {data[data.length - 2].name} - {}{' '}
              {parseFloat(
                data[data.length - 2].data[hazardReading.name]
              ).toFixed(2)}{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'green' }} />
              </svg>
            </Typography>
          </Grid>
          <Grid className={classes.country}>
            <Typography variant="body2" className={classes.textStyle}>
              3. {data[data.length - 3].name} -{' '}
              {parseFloat(
                data[data.length - 3].data[hazardReading.name]
              ).toFixed(2)}{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'green' }} />
              </svg>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.hazardContainer} lg={6}>
        <Typography className={classes.title}>
          {' '}
          Least Hazardous Readings in Africa
        </Typography>
        <Grid>
          <Grid className={classes.country}>
            <Typography variant="body2" className={classes.textStyle}>
              1. {data[0].name} -{' '}
              {parseFloat(data[0].data[hazardReading.name]).toFixed(2)}{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'green' }} />
              </svg>
            </Typography>
          </Grid>
          <Grid className={classes.country}>
            <Typography variant="body2" className={classes.textStyle}>
              2. {data[1].name} -{' '}
              {parseFloat(data[1].data[hazardReading.name]).toFixed(2)}{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'green' }} />
              </svg>
            </Typography>
          </Grid>
          <Grid className={classes.country}>
            <Typography variant="body2" className={classes.textStyle}>
              3. {data[2].name} -{' '}
              {parseFloat(data[2].data[hazardReading.name]).toFixed(2)}{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'green' }} />
              </svg>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HazardReading;
