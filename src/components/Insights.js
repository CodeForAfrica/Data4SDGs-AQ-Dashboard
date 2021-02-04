import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'components/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#F3F3F3',
    margin: '0 auto',
    marginTop: theme.typography.pxToRem(50),
    padding: `${theme.typography.pxToRem(48)} 0`,
    width: '100%',
  },
  section: {
    backgroundColor: 'inherit',
    marginTop: theme.typography.pxToRem(24),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '76.125rem',
    },
  },
  text: {},
  sectionText: {
    marginTop: '2rem',
  },
}));

function Insights(props) {
  const classes = useStyles(props);

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h3">Do you want to play with the data?</Typography>
      </Grid>
      <Grid item xs={12} container justify="center">
        <Grid item className={classes.section}>
          <Typography variant="body1" className={classes.text}>
            Our data can give you granular real-time insights. Use the
            dashboard&apos;s <Link href="/dashboard/docs">API toolkit</Link> to
            access the raw real-time data, and extract granular insights or
            reports.
          </Typography>
          <Grid className={classes.sectionText}>
            <Typography variant="h5">
              <Link href="/dashboard/docs">Use the API here</Link>{' '}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Insights.propTypes = {};
Insights.defaultProps = {};

export default Insights;
