import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';

import API, { COUNTRIES_LOCATION, getFormattedWeeklyP2Stats } from 'api';

import AQIndex from 'components/City/AQIndex';
import Footer from 'components/Footer';
import HazardReading from 'components/City/HazardReadings';
import Insights from 'components/Insights';
import Navbar from 'components/Header/Navbar';
import Resources from 'components/Resources';
import SensorMap from 'components/SensorMap';
import Ticker from 'components/Ticker';
import QualityStatsGraph from 'components/City/QualityStatsGraph';

import NotFound from 'pages/404';
import config from '../../config';

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
    marginTop: '4.2rem',
    [theme.breakpoints.up('md')]: {
      marginTop: '1rem',
    },
  },
  loading: {
    textAlign: 'center',
  },
  loadingContainer: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hazardContainer: {
    flexDirection: 'column',
  },
}));

const DASHBOARD_PATHNAME = '/dashboard';

function Country({ country: countrySlug, data, errorCode, meta, ...props }) {
  const classes = useStyles(props);
  const [session, loading] = useSession();
  const [country, setCountry] = useState(countrySlug);

  if (loading) return null;

  if (!loading && !session) {
    Router.push('/');
  }

  const { weeklyData } = data;

  // if !data, 404
  if (!COUNTRIES_LOCATION[country] || errorCode >= 400) {
    return <NotFound />;
  }

  const handleSearch = (option) => {
    const searchedCountry = (option && option.value) || DEFAULT_COUNTRY;
    if (searchedCountry !== country) {
      setCountry(searchedCountry);
      const countryUrl = `${DASHBOARD_PATHNAME}/[id]`;
      const countryAs = `${DASHBOARD_PATHNAME}/${searchedCountry}`;
      Router.push(countryUrl, countryAs);
    }
  };

  return (
    <>
      <Navbar handleSearch={handleSearch} />
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
            zoom={COUNTRIES_LOCATION[country].zoom}
            latitude={COUNTRIES_LOCATION[country].latitude}
            longitude={COUNTRIES_LOCATION[country].longitude}
            location={COUNTRIES_LOCATION[country].label}
          />
        </Grid>
        {meta && meta.database_last_updated?.length ? (
          <Grid item xs={12} id="ticker" className={classes.section}>
            <Ticker
              title="Executive Summary"
              subtitle={`Database Size: ${meta.database_size}`}
              statuses={[
                {
                  highlight: true,
                  name: 'Data Points',
                  status: 'Collected',
                  slug: 'data-values',
                },
                {
                  highlight: true,
                  name: 'AQ Sensors',
                  status: 'Monitored',
                  slug: 'sensors',
                },
                {
                  highlight: true,
                  name: 'AQ Nodes',
                  status: 'Monitored',
                  slug: 'nodes',
                },
                {
                  highlight: true,
                  name: 'Networks',
                  status: 'Total',
                  slug: 'networks',
                },
              ]}
              values={{
                'data-values': meta.sensor_data_count,
                sensors: meta.sensors_count,
                nodes: meta.nodes_count,
                networks: meta.sensor_networks.count,
              }}
              valueTexts={{
                'data-values': `Updated: ${new Date(
                  meta.database_last_updated
                ).toISOString()}`,
                networks: `in ${meta.sensors_locations?.length} countries`,
              }}
            />
          </Grid>
        ) : null}
        <Grid
          item
          justify="center"
          container
          lg={12}
          id="graph"
          className={classes.graphContainer}
        >
          <Grid item xs={12} lg={6}>
            {weeklyData.length > 0 ? (
              <div>
                <Typography>
                  Air Quality in {COUNTRIES_LOCATION[country].label}
                </Typography>
                <QualityStatsGraph
                  yLabel="PM2.5"
                  xLabel="Date"
                  data={{ name: country, data: weeklyData }}
                />
              </div>
            ) : null}
            <Typography> Air Quality in Africa</Typography>
            <QualityStatsGraph
              yLabel="PM10"
              xLabel="Date"
              data={config.multiAirData}
            />
          </Grid>
          <Grid
            container
            alignItems="center"
            item
            xs={12}
            lg={6}
            className={classes.hazardContainer}
          >
            <HazardReading />
          </Grid>

          <Grid item lg={12} justify="center">
            <AQIndex />
          </Grid>
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
  data: PropTypes.shape({
    air: PropTypes.shape({}).isRequired,
    weeklyP2: PropTypes.shape({}).isRequired,
  }),
  errorCode: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  meta: PropTypes.shape({}).isRequired,
};

Country.defaultProps = {
  country: undefined,
  data: undefined,
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
  const country = countryProps || DEFAULT_COUNTRY;
  const { city } = COUNTRIES_LOCATION[country];
  const airRes = await API.getAirData(city);
  const weeklyP2Res = await API.getWeeklyP2Data(city);
  let errorCode = airRes.statusCode > 200 && airRes.statusCode;

  errorCode =
    !errorCode && weeklyP2Res.statusCode > 200 && weeklyP2Res.statusCode;
  const air = (!errorCode && (await airRes.json())) || {};
  const weeklyP2 = (!errorCode && (await weeklyP2Res.json())) || {};

  const weeklyData = getFormattedWeeklyP2Stats(weeklyP2);
  const data = { air, weeklyData };

  const metaRes = await fetch('http://api.sensors.africa/v2/meta/');
  errorCode = !errorCode && metaRes.statusCode > 200 && metaRes.statusCode;
  const meta = (!errorCode && (await metaRes.json())) || {};

  // Pass data to the page via props
  return {
    props: { errorCode, country, data, meta },
    revalidate: 300, // seconds
  };
}

export default Country;
