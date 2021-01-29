import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'components/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    margin: '0 auto',
    marginTop: theme.typography.pxToRem(50),
    width: '100%',
  },
  section: {
    marginTop: theme.typography.pxToRem(24),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '76.125rem',
    },
  },
  text: {
    textAlign: 'left',
  },
}));

function Insights(props) {
  const classes = useStyles(props);

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={12}>
        <Typography variant="h3">Get Real-time Insights</Typography>
      </Grid>
      <Grid item xs={12} container justify="center">
        <Grid item className={classes.section}>
          <Typography variant="body1" className={classes.text}>
            Use the
            <Link href="/dashboard/docs">API</Link> to access raw data and
            create real-time insights.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

Insights.propTypes = {};
Insights.defaultProps = {};

export default Insights;
