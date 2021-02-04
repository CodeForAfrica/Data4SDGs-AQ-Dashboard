import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    marginTop: '0rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '0rem',
    },
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

function DataArchives({ tokens }) {
  const {
    airNowToken,
    airQOToken,
    data4SDGToken,
    purpleAirToken,
    smartCitizenToken,
  } = tokens;
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
            Authorization
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.wiki}>
          <Typography variant="body2">
            <a
              href="http://api.sensors.africa"
              target="_blank"
              rel="noopener noreferrer"
            >
              sensors.AFRICA
            </a>{' '}
            collects data from different sensor networks across the continent
            and stores them as private data. To access this private data, you
            require an access token. Place the token in the HTTP authorization
            header when making a requests and the API will return all the data
            authorized for the token.
            <br />
            <br />
            An example using <code>curl</code> would be:
            <br />
            <pre className={classes.queryParam}>
              {`curl -H "Authorization: Token <ACCESS_TOKEN>" http://api.sensors.africa/v2/node/`}
            </pre>
            <br />
            The above API call would then return all nodes belonging to the
            network identified by the <code>ACCESS_TOKEN</code>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.wiki}>
          <Typography variant="h6" className={classes.title} component="h3">
            Access Tokens{' '}
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
          <Grid className={classes.dt}>
            <Typography variant="body2" component="p">
              AirNow
            </Typography>
          </Grid>

          <Grid item className={classes.dd}>
            <code className={classes.code}>{airNowToken}</code>
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
          <Grid className={classes.dd}>
            <Typography variant="body2" component="p">
              AirQO
            </Typography>
          </Grid>

          <Grid item className={classes.dt}>
            <code className={classes.code}>{airQOToken}</code>
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
          <Grid className={classes.dt}>
            <Typography variant="body2" component="p">
              Data4DSGs*
            </Typography>
          </Grid>

          <Grid item className={classes.dd}>
            <code className={classes.code}>{data4SDGToken}</code>
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
          <Grid className={classes.dt}>
            <Typography variant="body2" component="p">
              PurpleAir
            </Typography>
          </Grid>

          <Grid item className={classes.dd}>
            <code className={classes.code}>{purpleAirToken}</code>
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
          <Grid className={classes.dt}>
            <Typography variant="body2" component="p">
              SmartCitizen
            </Typography>
          </Grid>

          <Grid item className={classes.dd}>
            <code className={classes.code}>{smartCitizenToken}</code>
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.wiki}>
          <Typography variant="caption">
            * Data4DSGs token is a super token that can be used to access all
            data regardless of which networked the data was pulled from.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DataArchives;
