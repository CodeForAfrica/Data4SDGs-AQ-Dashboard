import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      marginTop: '2rem',
    },
  },
  aqText: {
    fontSize: '50px',
    // fontFamily: 'Roboto',
    fontWeight: 'bold',
    position: 'relative',
    bottom: '2rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '72px',
      bottom: '3.5rem',
    },
  },
  centerText: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  descText: {
    padding: '0 2rem',
    marginTop: '1rem',
    fontSize: '16px',
    [theme.breakpoints.up('lg')]: {
      padding: '0 20rem',
    },
  },
  //   lineBreak: {
  //     width: '600px',
  //   },
  dataStatus: {
    margin: '2rem',
    [theme.breakpoints.up('lg')]: {
      margin: '3rem 1.5rem',
    },
  },
  nodeContainer: {
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
  nodeData: {
    fontSize: '30px',
    position: 'relative',
    bottom: '1.3rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: '48px',
      bottom: '2.3rem',
      padding: '0 1rem',
    },
  },
  nodeUnderline: {
    backgroundColor: 'rgba(47, 181, 107, 0.5)',
    height: '20px',
    borderRadius: '5px',
    padding: '0 1rem',
  },
  underline: {
    backgroundColor: 'rgba(47, 181, 107, 0.5)',
    height: '40px',
    padding: '0 1rem',
    borderRadius: '10px',
    [theme.breakpoints.up('md')]: {
      padding: '0 2rem',
    },
  },
  lastUpdate: {
    backgroundColor: 'rgba(47, 181, 107, 0.5)',
    borderRadius: '10px',
    padding: '0 0.5rem',
  },
}));

function NodesData({
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
    <Grid
      container
      alignItems="center"
      direction="column"
      className={classes.root}
    >
      <Grid item className={classes.underline}>
        <Typography className={`${classes.aqText} ${classes.centerText}`}>
          {sensorTotal.toLocaleString()}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={`${classes.centerText} ${classes.boldText}`}>
          air quality measurements
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.text}>last updated</Typography>
      </Grid>
      <Grid item>
        <Typography
          className={`${classes.centerText} ${classes.boldText} ${classes.lastUpdate}`}
        >
          on {lastUpdatedDay}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.centerText}>
          {lastUpdatedFormatted}
        </Typography>
      </Grid>
      <Grid item>
        <Typography className={`${classes.centerText} ${classes.descText}`}>
          This experimental dashboard tracks air quality data aggregated via API
          or regular manual data uploads from independent citizen science or
          academic research networks across Africa. The dashboard is intended to
          give users an overview of existing network coverage and data trends,
          as well as gaps in coverage. It offers researchers insights into that
          challenges grassroots AQ networks face in keeping sensors online, and
          the wide disparities in data standards and quality. <br />
          All information in the repository is open data. sensors.AFRICA is
          custodian of the dashboard. We are happy to explore suggestions for
          adding new networks to the repository.
        </Typography>
      </Grid>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.nodeContainer}
      >
        <Grid className={classes.dataStatus}>
          <Grid className={`${classes.nodeUnderline}`}>
            <Typography
              className={`${classes.boldText} ${classes.nodeData} ${classes.centerText}`}
            >
              {sensors.toLocaleString()}
            </Typography>
          </Grid>
          <Typography className={`${classes.boldText} ${classes.centerText}`}>
            sensors
          </Typography>
        </Grid>
        <Grid className={classes.dataStatus}>
          <Grid className={`${classes.nodeUnderline}`}>
            <Typography
              className={`${classes.boldText} ${classes.nodeData} ${classes.centerText} `}
            >
              {nodes.toLocaleString()}
            </Typography>
          </Grid>
          <Typography className={`${classes.boldText} ${classes.centerText} `}>
            nodes
          </Typography>
        </Grid>
        <Grid className={classes.dataStatus}>
          <Grid className={`${classes.nodeUnderline}`}>
            <Typography
              className={`${classes.boldText} ${classes.nodeData} ${classes.centerText}`}
            >
              {cities.toLocaleString()}
            </Typography>
          </Grid>
          <Typography className={`${classes.boldText} ${classes.centerText}`}>
            cities
          </Typography>
        </Grid>
        <Grid className={classes.dataStatus}>
          <Grid className={`${classes.nodeUnderline}`}>
            <Typography
              className={`${classes.boldText} ${classes.nodeData} ${classes.centerText}`}
            >
              {countries.toLocaleString()}
            </Typography>
          </Grid>
          <Typography className={`${classes.boldText} ${classes.centerText}`}>
            countries
          </Typography>
        </Grid>
        <Grid className={classes.dataStatus}>
          <Grid className={`${classes.nodeUnderline}`}>
            <Typography
              className={`${classes.boldText} ${classes.nodeData} ${classes.centerText}`}
            >
              {networks.toLocaleString()}
            </Typography>
          </Grid>
          <Typography className={`${classes.boldText} ${classes.centerText}`}>
            networks
          </Typography>
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

NodesData.propTypes = {
  sensors: PropTypes.string,
  sensorTotal: PropTypes.string,
  nodes: PropTypes.string,
  networks: PropTypes.string,
  cities: PropTypes.string,
  countries: PropTypes.string,
};

NodesData.defaultProps = {
  sensors: undefined,
  sensorTotal: undefined,
  nodes: undefined,
  networks: undefined,
  cities: undefined,
  countries: undefined,
};

export default NodesData;
