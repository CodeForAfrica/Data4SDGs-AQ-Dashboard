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
  title: {
    position: 'relative',
    bottom: '30px',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '40px',
      bottom: '20px',
    },
    [theme.breakpoints.between('xs', 'xs')]: {
      bottom: '60px',
    },
  },
  apiLink: {
    color: '#424143',
  },
  background: {
    backgroundColor: 'rgba(47, 181, 107, 0.5)',
    width: '250px',
    borderRadius: '15px',
    padding: '5px 20px',
  },
  underline: {
    backgroundColor: 'rgba(47, 181, 107, 0.5)',
    height: '40px',
    maxWidth: '800px',
    borderRadius: '10px',
    [theme.breakpoints.between('sm', 'sm')]: {
      maxWidth: '600px',
    },
    [theme.breakpoints.between('xs', 'xs')]: {
      margin: '0 20px',
      marginTop: '30px',
    },
  },
}));

function Insights(props) {
  const classes = useStyles(props);

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} className={classes.underline}>
        <Typography variant="h3" className={classes.title}>
          Do you want to play with the data?
        </Typography>
      </Grid>
      <Grid item xs={12} container justify="center">
        <Grid item className={classes.section}>
          <Typography variant="body1" className={classes.text}>
            Our data can give you granular real-time insights. Use the dashboard
            API toolkit to access the raw real-time data, and extract granular
            insights or reports.
          </Typography>
          <Grid container justify="center" className={classes.sectionText}>
            <Typography variant="h5">
              <Grid className={classes.background}>
                <Link className={classes.apiLink} href="/dashboard/docs">
                  Use the API here
                </Link>{' '}
              </Grid>
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
