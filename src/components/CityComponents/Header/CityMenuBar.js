import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import CitySearchBar from './CitySearchBar';
import HamburgerMenu from '../../Hambuger/HambugerMenu';

import logowhite from '../../../assets/Logo-White.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      paddingRight: '8%',
      paddingLeft: '8%'
    }
  },
  icon: {
    color: 'white',
    paddingTop: '3%'
  },
  iconContainer: {
    paddingTop: '2rem'
  }
});

function MenuBar({ classes }) {
  return (
    <Grid
      container
      className={classes.root}
      justify="space-between"
      alignItems="flex-start"
    >
      <Grid item>
        <Grid container alignItems="flex-start">
          <Grid item>
            <Link to="/">
              <img src={logowhite} alt="Sensors Africa Logo" height="100" />
            </Link>
          </Grid>
          <Grid item>
            <CitySearchBar placeholder="Search for another location ..." />
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <HamburgerMenu />
      </Grid>
    </Grid>
  );
}

MenuBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(MenuBar));
