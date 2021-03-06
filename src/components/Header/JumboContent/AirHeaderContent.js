import React from 'react';
import PropTypes from 'prop-types';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from 'components/SearchBar';

const useStyles = makeStyles((theme) => ({
  titleSection: {
    flexGrow: 1,
    textAlign: 'center',
    paddingTop: '6rem',
    [theme.breakpoints.up('md')]: {
      paddingRight: '20%',
      paddingLeft: '20%',
    },
    [theme.breakpoints.up('lg')]: {
      paddingRight: '25%',
      paddingLeft: '25%',
    },
  },
  headerText: {
    color: 'white',
    paddingBottom: '1rem',
  },
  searchBar: {
    paddingBottom: '6rem',
  },
}));

function AirHeaderContent({ handleSearch }) {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.titleSection}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.headerText}>
          SENSOR DATA COLLATED
        </Typography>
      </Grid>
      <Grid item className={classes.searchBar}>
        <SearchBar handleSearch={handleSearch} />
      </Grid>
    </Grid>
  );
}

AirHeaderContent.propTypes = {
  handleSearch: PropTypes.func.isRequired,
};

export default AirHeaderContent;
