import React from 'react';
import PropTypes from 'prop-types';

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
  dataStatus: {
    padding: '0 3rem',
  },
}));

function Experimental({
  sensors,
  sensorTotal,
  nodes,
  networks,
  cities,
  countries,
  lastUpdated,
  ...props
}) {
  const classes = useStyles(props);

  const lastUpdatedFormatted = new Date(lastUpdated).toLocaleDateString(
    'en-gb',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );
  const lastUpdatedDay = new Date(lastUpdated).toLocaleDateString('en-gb', {
    weekday: 'long',
  });
  return (
    <Grid>
      <Grid item>
        <Typography className={`${classes.aqText} ${classes.text}`}>
          {sensorTotal.toLocaleString()}
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
          on {lastUpdatedDay}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.text}>{lastUpdatedFormatted}</Typography>
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
        <Grid className={classes.dataStatus}>
          <Typography>{sensors.toLocaleString()}</Typography>
          <Typography>sensors</Typography>
        </Grid>
        <Grid className={classes.dataStatus}>
          <Typography>{nodes.toLocaleString()}</Typography>
          <Typography>nodes</Typography>
        </Grid>
        <Grid className={classes.dataStatus}>
          <Typography>{cities.toLocaleString()}</Typography>
          <Typography>cities</Typography>
        </Grid>
        <Grid className={classes.dataStatus}>
          <Typography>{countries.toLocaleString()}</Typography>
          <Typography>countries</Typography>
        </Grid>
        <Grid className={classes.dataStatus}>
          <Typography>{networks.toLocaleString()}</Typography>
          <Typography>networks</Typography>
        </Grid>
      </Grid>
      {/* <hr className={classes.lineBreak} />
      <Grid item>
        <Typography className={`${classes.text} ${classes.boldText}`}>
          All charts below are based on calculations over the previous 4 weeks
        </Typography>
      </Grid> */}
      {/* <Grid item>
        <Typography className={classes.text}>
          (current period: 2021-01-01 to 2021-02-03)
        </Typography>
      </Grid> */}
    </Grid>
  );
}

Experimental.propTypes = {
  sensors: PropTypes.string,
  sensorTotal: PropTypes.string,
  nodes: PropTypes.string,
  networks: PropTypes.string,
  cities: PropTypes.string,
  countries: PropTypes.string,
};

Experimental.defaultProps = {
  sensors: undefined,
  sensorTotal: undefined,
  nodes: undefined,
  networks: undefined,
  cities: undefined,
  countries: undefined,
};

export default Experimental;
