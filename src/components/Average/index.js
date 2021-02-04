import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 10px',
  },
  section: {
    margin: '0 10px',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '76.125rem',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100vw',
    },
  },
  container: {
    marginTop: '1rem',
    padding: '1.125rem',
    [theme.breakpoints.up('md')]: {
      padding: '1.125rem 2.625rem 1.25rem',
    },
  },
  textContainer: {
    margin: '40px 0',
  },
  title: {
    textTransform: 'uppercase',
  },
}));

function Average({ ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Grid
          container
          justify="center"
          alignItems="center"
          lg={12}
          className={classes.container}
        >
          <Grid item lg={6} className={classes.textContainer}>
            <Typography variant="h5" component="h2" className={classes.title}>
              10h38
            </Typography>
            <Typography variant="subtitle2" component="h3">
              Most dangerous time of the day in 56 African countries.
            </Typography>
          </Grid>
          <Grid item lg={6}>
            <Typography variant="h5" component="h2" className={classes.title}>
              Friday
            </Typography>
            <Typography variant="subtitle2" component="h3">
              Most dangerous day of the week in 56 African countries.
            </Typography>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Average;
