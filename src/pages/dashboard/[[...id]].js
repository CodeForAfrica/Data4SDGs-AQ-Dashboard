import React from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';

import { COUNTRIES_LOCATION } from 'api';

import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import Resources from 'components/Resources';
import SensorMap from 'components/SensorMap';

import NotFound from 'pages/404';
import Insights from 'components/Insights';

const DEFAULT_COUNTRY = 'africa';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // TODO(kilemensi): This is hack to force the page to be 100% wide w/o
    //                  horizontal scrollbars.
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#fff',
  },
  graphContainer: {
    maxWidth: '82rem',
    width: '100%',
    color: 'black',
    marginTop: theme.typography.pxToRem(50),
    textAlign: 'center',
    scrollMarginTop: '5.9rem',
    [theme.breakpoints.down('xs')]: {
      scrollMarginTop: '8.9rem',
    },
  },
  section: {
    width: '100%',
    color: 'black',
    textAlign: 'center',
    scrollMarginTop: '3.2rem',
    [theme.breakpoints.down('xs')]: {
      scrollMarginTop: '6.3rem',
    },
  },
  topMargin: {
    marginTop: '1.7rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '2.5rem',
    },
  },
  loading: {
    textAlign: 'center',
  },
  iframe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  responsiveInlineIframe: {
    maxWidth:
      '1280px' /** 4*16 aspect ratio from 1280/400% by padding top in responsiveInlineIframeInner */,
    margin: 'auto',
  },
  responsiveInlineIframeInner: {
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '400%',
    height: '0px',
  },
  loadingContainer: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hazardContainer: {},
  chartTitle: {
    fontWeight: 'bold',
  },
}));

function Country({ country: location, data, errorCode, ...props }) {
  const classes = useStyles(props);

  const [session, loading] = useSession();
  if (loading) return null;

  if (!loading && !session) {
    Router.push('/');
  }
  // if !data, 404
  if (!COUNTRIES_LOCATION[location] || errorCode >= 400) {
    return <NotFound />;
  }

  return (
    <>
      <Navigation location={location} />
      <Grid
        className={classes.root}
        justify="center"
        alignItems="center"
        container
      >
        <Grid
          item
          lg={12}
          id="map"
          className={`${classes.section} ${classes.topMargin}`}
        >
          <SensorMap
            zoom={COUNTRIES_LOCATION[location].zoom}
            latitude={COUNTRIES_LOCATION[location].latitude}
            longitude={COUNTRIES_LOCATION[location].longitude}
            location={COUNTRIES_LOCATION[location].label}
          />
        </Grid>
        <Grid item id="insights" className={classes.section} xs={12}>
          <div className={classes.responsiveInlineIframe}>
            <div className={classes.responsiveInlineIframeInner}>
              <iframe
                title="Sensors Report"
                width="100%"
                className={classes.iframe}
                src="https://datastudio.google.com/embed/reporting/b848529e-8e67-4fda-9897-b6efb6a6c680/page/9mA0B"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        </Grid>
        <Grid item id="insights" className={classes.section} xs={12}>
          <Insights />
        </Grid>
        <Grid item id="resources" className={classes.section} xs={12}>
          <Resources />
        </Grid>
        <Grid id="contacts" className={classes.section} item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

Country.propTypes = {
  country: PropTypes.string,
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

Country.defaultProps = {
  country: undefined,
  errorCode: false,
};

export async function getStaticPaths() {
  const fallback = false;
  const defaultRoute = { params: { id: [] } };
  const paths = Object.values(COUNTRIES_LOCATION).map((country) => ({
    params: { id: [country.slug] },
  }));

  paths.push(defaultRoute);
  return { fallback, paths };
}

export async function getStaticProps({ params: { id: countryProps } }) {
  // Fetch data from external API
  const countryProp = countryProps || DEFAULT_COUNTRY;
  const { slug } = COUNTRIES_LOCATION[countryProp];
  const errorCode = slug ? 200 : 404;

  return {
    props: { errorCode, country: slug },
    revalidate: 3600, // 1 hour
  };
}

export default Country;
