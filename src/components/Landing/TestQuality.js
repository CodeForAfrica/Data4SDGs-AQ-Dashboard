import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import { Grid, Card, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import ComingSoon from '../ComingSoon';

import air from '../../assets/images/button/airbtn.png';

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    paddingTop: '2rem'
  },
  img: {
    height: '5.5rem',
    width: 'auto',
    margin: '3rem auto',
    [theme.breakpoints.up('md')]: {
      height: '12.5rem',
      margin: '0 auto',
      padding: '3rem'
    }
  },
  airCard: {
    backgroundColor: theme.palette.primary.light,
    height: '12.5rem',
    width: '10.5rem',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      width: '15.625rem'
    }
  },
  waterCard: {
    backgroundColor: '#4972B8',
    height: '12.5rem',
    width: '10.5rem',
    [theme.breakpoints.up('md')]: {
      width: '15.625rem'
    }
  },
  soundCard: {
    backgroundColor: '#B64598',
    height: '12.5rem',
    width: '10.5rem',
    [theme.breakpoints.up('md')]: {
      width: '15.625rem'
    }
  },
  testTitle: {
    color: 'white',
    paddingTop: '2rem',
    fontSize: '1rem',
    fontFamily: theme.typography.h6.fontFamily,
    fontWeight: 900
  }
});

class TestQuality extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };

    this.showComingSoonAlert = this.showComingSoonAlert.bind(this);
    this.hideComingSoonAlert = this.hideComingSoonAlert.bind(this);
  }

  showComingSoonAlert() {
    const { location, history } = this.props;
    if (location) {
      const { pathname } = location;
      history.push(pathname);
    }
    this.setState({ show: true });
  }

  hideComingSoonAlert() {
    this.setState({ show: false });
  }

  render() {
    const { classes } = this.props;
    const { show } = this.state;

    return (
      <Grid
        container
        className={classes.root}
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            className={classes.testTitle}
          >
            Test the quality of the city&apos;s
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{ paddingTop: '1rem', paddingBottom: '3rem' }}
          >
            <ComingSoon show={show} onClose={this.hideComingSoonAlert} />
            <Grid item>
              <Link to="/air">
                <Card className={classes.airCard}>
                  <CardMedia
                    component="img"
                    className={classes.img}
                    image={air}
                    title="Air"
                  />
                </Card>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

TestQuality.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(TestQuality));
