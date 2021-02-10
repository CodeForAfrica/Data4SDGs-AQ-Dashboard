import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Link from 'components/Link';
import SocialMedia from 'components/SocialMedia';

import codeforafrica from 'assets/images/logos/cfafrica_white.png';
import sensorslogo from 'assets/images/logos/logowhite.png';
import worldbank from 'assets/images/partners/worldbankgroup.png';
import globalpartner from 'assets/images/logos/globalpartner.svg';

import Email from 'components/Email';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    backgroundColor: theme.palette.secondary.main,
  },
  footerContainer: {
    [theme.breakpoints.up('md')]: {
      paddingBottom: '5rem',
    },
  },
  footerContentContainer: {
    textAlign: 'center',
    paddingBottom: '1rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '3rem',
      width: '19.875rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '26.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '2rem',
      borderTop: 'solid 1px white',
    },
    [theme.breakpoints.up('md')]: {
      marginTop: '3rem',
      width: '19.875rem',
      borderTop: 'none',
      borderBottom: 'none',
      borderRight: 'none',
    },
  },

  footerAboutContainer: {
    textAlign: 'center',
    paddingBottom: '1rem',
    borderTop: '1px solid white',
    borderBottom: '1px solid white',
    [theme.breakpoints.up('md')]: {
      marginTop: '3rem',
      width: '19.875rem',
      borderTop: 'none',
      borderBottom: 'none',
      borderLeft: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      width: '26.5rem',
    },
    [theme.breakpoints.down('sm')]: {
      paddingTop: '2rem',
    },
  },
  titles: {
    color: 'white',
    fontWeight: 800,
    textTransform: 'none',
  },
  socialMediaContainer: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
  },
  aboutContent: {
    color: 'white',
    padding: '1.2rem',

    textAlign: 'left',
    lineHeight: '2',

    marginLeft: '1.5rem',
    marginRight: '1.5rem',

    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      marginRight: '0',
    },
  },
  footerButton: {
    color: 'white',
    marginBottom: '2.75rem',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    backgroundColor: theme.palette.secondary.dark,
    fontWeight: 800,
    fontSize: theme.typography.subtitle2.fontSize,
    height: '3rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      height: '3.5rem',
      marginTop: '1rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: '4rem',
    },
  },
  buttonLink: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  supportText: {
    color: 'white',
    padding: '1.2rem',
    lineHeight: '2',
    [theme.breakpoints.up('md')]: {
      marginLeft: '1.5rem',
      marginRight: '1.5rem',
      textAlign: 'left',
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '0rem',
      marginRight: '0rem',
    },
  },
  img: {
    maxWidth: '100%',
    height: '100px',
  },

  logo: {
    paddingTop: '2rem',
    [theme.breakpoints.up('md')]: {
      paddingTop: '6rem',
    },
  },

  socialContainer: {
    border: '1px solid white',
    borderBottom: 'none',
    borderTop: 'none',
    [theme.breakpoints.between('xs', 'sm')]: {
      border: 'none',
      paddingBottom: '40px',
    },
  },
}));

function Footer(props) {
  const classes = useStyles(props);
  return (
    <Grid
      container
      color="secondary"
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid
        item
        xs={12}
        container
        className={classes.footerContainer}
        justify="center"
        alignItems="flex-start"
      >
        <Grid item className={classes.footerAboutContainer}>
          <Typography variant="h6" className={classes.titles}>
            ABOUT
          </Typography>
          <div className={classes.aboutContent}>
            <Typography variant="caption">
              This experimental dashboard is a pilot project that seeks to map
              citizen science initiatives across Africa that use low-cost air
              quality (AQ) sensors, to offer insights into potential new data
              collection and evaluation methods. The project was a winner (
              <Link href="https://www.data4sdgs.org/news/7-data-innovation-projects-win-funding-tackle-local-challenges">
                see announcement here
              </Link>
              ) of the
              <b> Global Partnership for Sustainable Development Data’</b>s
              third round of funding for collaborative data innovation projects
              in January 2019.
            </Typography>
          </div>
          <Grid container justify="center" alignItems="center">
            <a
              href="https://www.data4sdgs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={globalpartner}
                alt="Data for SDGs"
                className={classes.img}
              />
            </a>
          </Grid>
        </Grid>

        <Grid
          item
          className={`${classes.footerContentContainer} ${classes.socialContainer}`}
        >
          <Typography variant="h6" className={classes.titles}>
            CONNECT WITH US
          </Typography>
          <div className={classes.socialMediaContainer}>
            <SocialMedia />
          </div>
          <Email />
          <Grid
            className={classes.logo}
            container
            justify="center"
            alignItems="center"
          >
            <a
              href="https://codeforafrica.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={codeforafrica}
                alt="Code for Africa"
                className={classes.img}
              />
            </a>
            <a
              href="https://sensors.africa/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={sensorslogo}
                alt="Sensors Africa"
                className={classes.img}
              />
            </a>
          </Grid>
        </Grid>

        <Grid item className={classes.footerContentContainer}>
          <Typography variant="h6" className={classes.titles}>
            INCUBATED BY
          </Typography>
          <div className={classes.supportText}>
            <Typography variant="caption">
              The dashboard is implemented by <b>Code for Africa’</b>s (CfA)
              <b> sensors.AFRICA</b> initiative, with support from the{' '}
              <b>World Bank’s Development Economics Data Group (DECDG)</b> and{' '}
              <b>
                Social, Urban, Rural and Resilience Global Practice (GPSURR).
              </b>{' '}
              The project uses open source tools and open data platforms to
              aggregate AQ measurements from across the continent.
            </Typography>
          </div>
          <Grid container justify="center" alignItems="center">
            <Grid item xs>
              <a
                href="https://www.worldbank.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={worldbank}
                  alt="World Bank Group"
                  className={classes.img}
                />
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
