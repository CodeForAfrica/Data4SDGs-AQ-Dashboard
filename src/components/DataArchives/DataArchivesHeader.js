import React from 'react';

import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  jumbotron: {
    flexGrow: 1,
    borderRadius: 'none',
    height: '20rem',
  },
  headline: {
    textAlign: 'center',
  },
  caption: {
    display: 'block',
    textTransform: 'none',
  },
}));

function DataArchivesHeader() {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.jumbotron}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h5" className={classes.headline}>
          SENSORS AFRICA
          <Typography variant="caption" className={classes.caption}>
            How to access data from api.sensors.africa
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default DataArchivesHeader;
