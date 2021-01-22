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
        <Grid item xs={12} className={classes.wiki}>
          <Typography variant="body2" className={classes.title} component="h3">
            To access the various Network, you will have to pass the
            Authorization Token for that network in the header file
            <br />
            Example
            <pre className={classes.queryParam}>
              {`
header:{
    Authorization:"token {acessToken}" 
}
                `}
            </pre>
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
          <Grid item className={classes.dt}>
            <code className={classes.code}>
              a5f804ade081126ea03f32e2905b234f9716be1a
            </code>
          </Grid>

          <Grid className={classes.dd}>
            <Typography variant="body2" component="p">
              Purple Air
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
            <code className={classes.code}>
              f90688c212115e97400e1ea93907e359474ec4a6
            </code>
          </Grid>

          <Grid className={classes.dd}>
            <Typography variant="body2" component="p">
              AirQO
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
            <code className={classes.code}>
              d58e7d33fcd9bb9a9b7c86a03ff9db7232be7a28
            </code>
          </Grid>

          <Grid className={classes.dd}>
            <Typography variant="body2" component="p">
              OpenAQ
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DataArchives;
