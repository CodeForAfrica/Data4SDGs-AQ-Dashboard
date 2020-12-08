import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  country: {
    margin: '10px 0',
  },
  hazardContainer: {
    marginTop: '100px',
  },
}));

function HazardReading() {
  const classes = useStyles();
  return (
    <>
      <Grid>
        <Typography> Most Hazardous Readings in Africa</Typography>
        <Grid>
          <Grid className={classes.country}>
            <Typography className={classes.textStyle}>
              1. South Africa - 250{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'red' }} />
              </svg>
            </Typography>
          </Grid>
          <Grid className={classes.country}>
            <Typography className={classes.textStyle}>
              2. Nigeria - 159{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'red' }} />
              </svg>
            </Typography>
          </Grid>
          <Grid className={classes.country}>
            <Typography className={classes.textStyle}>
              3. Kenya - 155{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'purple' }} />
              </svg>
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid className={classes.hazardContainer}>
        <Typography> Least Hazardous Readings in Africa</Typography>
        <Grid>
          <Grid className={classes.country}>
            <Typography className={classes.textStyle}>
              1. Togo - 49{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'green' }} />
              </svg>
            </Typography>
          </Grid>
          <Grid className={classes.country}>
            <Typography className={classes.textStyle}>
              2. Tanzania - 45{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'green' }} />
              </svg>
            </Typography>
          </Grid>
          <Grid className={classes.country}>
            <Typography className={classes.textStyle}>
              3.Ghana - 55{' '}
              <svg width="15" height="15">
                <rect width="15" height="15" style={{ fill: 'yellow' }} />
              </svg>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default HazardReading;