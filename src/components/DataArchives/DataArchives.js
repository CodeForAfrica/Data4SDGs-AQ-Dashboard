import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DataArchivesCustomTable from './DataArchivesCustomTable';

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
    paddingTop: '1.5rem',
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
    padding: '2rem 0.5rem',
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
    backgroundColor: '#fafafa',
    bordeRadius: '4px',
    padding: '0.5rem',
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
  body2: {
    fontStyle: 'italic',
  },
}));

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
          <Typography variant="h6" className={classes.typography}>
            Accessing Sensors Data
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title} component="h3">
            Accessing Private Data
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            component="p"
            style={{ paddingBottom: '2rem' }}
          >
            The primary way to access private sensor data is via API endpoints:{' '}
            <code className={classes.code}>/v1/node</code> and{' '}
            <code className={classes.code}>/v2/data</code>
          </Typography>
        </Grid>

        <DataArchivesCustomTable />
        <Grid item xs={12}>
          <Typography variant="h6" className={classes.title} component="h3">
            Accessing Public Data
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" className={classes.body2}>
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
          <Typography variant="body2" className={classes.body2}>
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
