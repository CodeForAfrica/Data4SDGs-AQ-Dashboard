import React from 'react';
// import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  aqText: {
    fontSize: '72px',
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  text: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  descText: {
    padding: '0 20rem',
  },
  lineBreak: {
    width: '600px',
  },
}));

function Experimental() {
  const classes = useStyles();
  return (
    <Grid>
      <Grid item>
        <Typography className={`${classes.aqText} ${classes.text}`}>
          20,367,729
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={`${classes.text} ${classes.boldText}`}>
          air quality measurements
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.text}>last updated</Typography>
      </Grid>
      <Grid item>
        <Typography className={`${classes.text} ${classes.boldText}`}>
          on Monday
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.text}>
          08 February 2021 at 17h00 UTC{' '}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={`${classes.text} ${classes.descText}`}>
          This experimental dashboard tracks air quality data aggregated via API
          or regular manual data uploads from independent citizen science or
          academic research networks across Africa. The dashboard is intended to
          give users an overview of existing network coverage and data trends,
          as well as gaps in coverage. It offers researchers insights into that
          challenges grassroots AQ networks face in keeping sensors online, and
          the wide disparities in data standards and quality. All information in
          the repository is open data. sensors.AFRICA is custodian of the
          dashboard. We are happy to explore suggestions for adding new networks
          to the repository.
        </Typography>
      </Grid>
      <Grid container justify="center">
        <Grid>
          <Typography>1,183</Typography>
          <Typography>sensors</Typography>
        </Grid>
        <Grid>
          <Typography>483</Typography>
          <Typography>nodes</Typography>
        </Grid>
        <Grid>
          <Typography>82</Typography>
          <Typography>cities</Typography>
        </Grid>
        <Grid>
          <Typography>28</Typography>
          <Typography>countries</Typography>
        </Grid>
        <Grid>
          <Typography>7</Typography>
          <Typography>networks</Typography>
        </Grid>
      </Grid>
      <hr className={classes.lineBreak} />
      <Grid item>
        <Typography className={`${classes.text} ${classes.boldText}`}>
          All charts below are based on calculations over the previous 4 weeks
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.text}>
          (current period: 2021-01-01 to 2021-02-03)
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Experimental;
