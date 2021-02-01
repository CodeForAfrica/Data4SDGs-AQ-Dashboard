import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  main: {
    paddingBottom: '3rem',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '79.5rem',
    },
  },
  link: { color: theme.palette.primary.dark },
  typography: {
    paddingTop: theme.spacing(6),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 700,
    fontSize: '1rem',
    paddingTop: '2rem',
    paddingBottom: '1rem',
  },
  dlFirst: {
    padding: '1rem 0.5rem',
    borderTop: '1px solid #f0f4f7',
    borderBottom: '1px solid #f0f4f7',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  dl: {
    padding: '1rem 0.5rem',
    borderBottom: '1px solid #f0f4f7',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  dt: {
    [theme.breakpoints.up('md')]: {
      width: '29.8125rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '39.75rem',
    },
    marginBottom: '0.5rem',
  },
  dd: {
    [theme.breakpoints.up('md')]: {
      width: '29.8125rem',
      float: 'left',
    },
    [theme.breakpoints.up('lg')]: {
      width: '39.75rem',
    },
  },
  code: {
    display: 'inline-block',
    color: theme.palette.secondary.main,
    fontSize: theme.typography.caption.fontSize,
  },
  query: {
    fontSize: theme.typography.caption.fontSize,
  },
  queryParam: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.caption.fontSize,
  },
  queryDescription: {
    fontSize: theme.typography.caption.fontSize,
  },
  var: {
    color: theme.palette.primary.dark,
    fontStyle: 'italic',
    fontSize: theme.typography.caption.fontSize,
  },
  wiki: {
    marginTop: '2rem',
  },
}));

const apiV1Node =
  'http://api.sensors.africa/v1/node?&location__country=country';
const apiV2Data =
  'http://api.sensors.africa/v2/data?&location__country=country&timestamp__gte=timestamp';
const country = '{country}';
const timestamp = '{timestamp}';

function DataArchives() {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        container
        justify="center"
        alignItems="center"
        className={classes.main}
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            className={classes.typography}
            component="h2"
          >
            Accessing Sensors Data
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title} component="h3">
            Accessing Private Data
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" component="p">
            The primary way to access private sensor data is via API endpoints:{' '}
            <code className={classes.code}>/v1/node</code> and{' '}
            <code className={classes.code}>/v2/data</code>
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justify="flex-start"
          alignItems="flex-start"
          className={classes.dl}
        >
          <Grid item className={classes.dt}>
            <a
              className={classes.link}
              href="http://api.sensors.africa/v1/node/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code className={classes.code}>{apiV1Node}</code>
            </a>
          </Grid>

          <Grid className={classes.dd}>
            <Typography variant="body2" component="p">
              List all nodes belonging to the uthenticated user or network
              identified by the provided <code>ACCESS_TOKEN</code>
            </Typography>
            <Typography variant="body2">Supported queries are:</Typography>
            <Typography
              variant="body2"
              component="ul"
              style={{ listStyle: 'none', marginTop: '0.5rem' }}
            >
              <li className={classes.query}>
                <code className={classes.queryParam}>location__country</code>={' '}
                <code className={classes.queryDescription}>{country}</code>:
                Return list of nodes located in a given country only e.g.{' '}
                <code className={classes.var}>kenya</code> ,
                <code className={classes.var}>uganda</code>
              </li>
            </Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          container
          justify="flex-start"
          alignItems="flex-start"
          className={classes.dl}
        >
          <Grid item className={classes.dt}>
            <a
              className={classes.link}
              href="https://api.sensors.africa/v2/data"
              target="_blank"
              rel="noopener noreferrer"
            >
              <code className={classes.code}>{apiV2Data}</code>
            </a>
          </Grid>
          <Grid item className={classes.dd}>
            <Typography variant="body2" component="p">
              Provides <em>raw</em> sensor data of all nodes from a network
              identified by the provided <code>ACCESS_TOKEN</code>
            </Typography>
            <Typography variant="body2">Supported queries are:</Typography>
            <Typography
              variant="body2"
              component="ul"
              style={{ listStyle: 'none', marginTop: '0.5rem' }}
            >
              <li className={classes.query}>
                <code className={classes.queryParam}>location__country</code>={' '}
                <code className={classes.queryDescription}>{country}</code>:
                Return data from all sensors located in a given country only
                e.g. <code className={classes.var}>kenya</code> ,
              </li>
              <li className={classes.query}>
                {' '}
                <code className={classes.queryParam}>timestamp__gte</code>={' '}
                <code className={classes.queryDescription}>{timestamp}</code>:
                Return sensor data measurements greater than or equal to the
                given timestamp e.g.{' '}
                <code className={classes.var}>2021-01-12T12:29:21.428563Z</code>
              </li>
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title} component="h3">
            Accessing Public Data
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">
            For a more detailed documentation on how to access API data , visit
            the sensors.AFRICA{' '}
            <a
              className={classes.link}
              href="http://api.sensors.africa/docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Documentation
            </a>{' '}
            site
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.wiki}>
          <Typography variant="h6" className={classes.title} component="h3">
            Accessing Archive Data
          </Typography>
          <Typography variant="body2">
            In addition to sensor data accessible via the API, data is also
            exported once a day in CSV file format and made available at the{' '}
            <a
              className={classes.link}
              href="https://openafrica.net/organization/sensors-africa"
              target="_blank"
              rel="noopener noreferrer"
            >
              sensors.AFRICA Air Quality Archive
            </a>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DataArchives;
