import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import IframeComponent from 'components/SensorMap/IframeComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 560,
    width: '100%',
    backgroundColor: 'white',
  },
  headline: {
    textAlign: 'center',
    paddingBottom: theme.spacing(3),
  },
  caption: {
    display: 'block',
    textTransform: 'none',
  },
  fullHeight: {
    border: '1px solid #D6D6D6',
  },
}));

function Map({ zoom, latitude, longitude }) {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <IframeComponent
          title="Map section"
          src={`//wb.map.sensors.africa/#${zoom}/${latitude}/${longitude}`}
          height="500"
          width="100%"
          frameBorder="0"
          scrolling="no"
          classes={{ fullHeight: classes.fullHeight }}
        />
      </Grid>
    </Grid>
  );
}

export function AfricaMap({ classes }) {
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <IframeComponent
          title="Map section"
          src="//wb.map.sensors.africa/#4/-10.79/20.87"
          height="600"
          width="100%"
          frameBorder="0"
          scrolling="no"
        />
      </Grid>
    </Grid>
  );
}

Map.propTypes = {
  zoom: PropTypes.string.isRequired,
  latitude: PropTypes.string.isRequired,
  longitude: PropTypes.string.isRequired,
};
export default Map;
