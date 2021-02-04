import React from 'react';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';

import API, {
  COUNTRIES_LOCATION,
  dataByCountries,
  calculateAverage,
  sortCountries,
  getNodesPerCountry,
  getNodesPerNetwork,
} from 'api';

import Footer from 'components/Footer';
import Insights from 'components/Insights';
import Navigation from 'components/Navigation';
import Resources from 'components/Resources';
import SensorMap from 'components/SensorMap';
import Ticker from 'components/Ticker';
import TimeSeries from 'components/TimeSeries';
import Chart from 'components/Chart';
import Average from 'components/Average';
import BarChart from 'components/City/BarChart';

import NotFound from 'pages/404';

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
  hazardContainer: {},
  chartTitle: {
    fontWeight: 'bold',
  },
}));

function Country({
  country: location,
  data,
  errorCode,
  meta,
  networkNodes,
  countryNodes,
  ...props
}) {
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
        {meta && meta.database_last_updated?.length ? (
          <Grid item xs={12} id="ticker" className={classes.section}>
            <Ticker
              title="Executive Summary"
              subtitle={`Database Size: ${meta.database_size}`}
              description={`
              This experimental dashboard tracks air quality data aggregated via API or regular manual data uploads from independent citizen science or academic research networks across Africa. The dashboard is intended to give users an overview of existing network coverage and data trends, as well as gaps in coverage. It offers researchers insights into the that challenges grassroots AQ networks face in keeping sensors online, and the wide disparities in data standards and quality. All information in the repository is open data. sensors.AFRICA is custodian of the dashboard. We are happy to explore suggestions for adding new networks to the repository.               
              `}
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
                  name: 'Cities Covered',
                  status: 'Total',
                  slug: 'cities',
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
                nodes: meta.nodes.count,
                networks: meta.sensor_networks.count,
                cities: meta.sensors_cities?.length,
              }}
              valueTexts={{
                'data-values': `Updated: ${new Date(
                  meta.database_last_updated
                ).toISOString()}`,
                networks: `in ${meta.sensors_countries?.length} countries`,
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
          <Grid lg={6}>
            <BarChart data={networkNodes} />
          </Grid>
          <Grid lg={6}>
            <BarChart xLabel="Countries" data={countryNodes} />
          </Grid>

          <Average />

          <Grid>
            <TimeSeries description="Time Series Trends" />
          </Grid>
          <Grid container justify="center">
            <Chart
              title="Good"
              subtitle="Air Quality"
              description="Ranked by city/node"
              chartSrc="https://dev.pesayetu.pesacheck.org/embed/level1-KE_1_047/section-768KuR/chart-zsjQNF"
            />
            <Chart
              title="Bad"
              subtitle="Air Quality"
              description="Ranked by city/node"
              chartSrc="https://dev.pesayetu.pesacheck.org/embed/level1-KE_1_047/section-N9dGTq/chart-e9vx5K"
            />
          </Grid>
          <Grid container justify="center">
            <Chart
              description="Where are sensors located?"
              chartSrc="https://dev.pesayetu.pesacheck.org/embed/level1-KE_1_047/section-768KuR/chart-KnGbdK"
            />
            <Chart
              description="What is being measured?"
              chartSrc="https://dev.pesayetu.pesacheck.org/embed/level1-KE_1_047/section-768KuR/chart-KnGbdK"
            />
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
  nodes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
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
  const countryProp = countryProps || DEFAULT_COUNTRY;
  const { slug } = COUNTRIES_LOCATION[countryProp];
  let errorCode = slug ? 200 : 404;
  // const t0 = Date.now();
  const sensorsData = await API.getData();
  // const t1 = Date.now();
  // console.log(`Call to getData took ${t1 - t0} milliseconds.`); //husky fails

  const sensorsDataByCountry = dataByCountries(sensorsData);
  let countryData;
  if (slug !== 'africa') {
    countryData = sensorsDataByCountry[slug];
    errorCode = countryData ? 200 : 404;
  }
  const africaData = { Africa: calculateAverage(sensorsData) };
  const sortedCountries = sortCountries(sensorsDataByCountry);

  const data = { sortedCountries, sensorsDataByCountry, africaData };

  const metaRes = await fetch('http://api.sensors.africa/v2/meta/');
  errorCode = !errorCode && metaRes.statusCode > 200 && metaRes.statusCode;
  const meta = (!errorCode && (await metaRes.json())) || {};
  const networkNodes = await getNodesPerNetwork(meta.nodes_count);
  const countryNodes = await getNodesPerCountry(meta.sensors_countries || []);

  return {
    props: { errorCode, country: slug, data, meta, networkNodes, countryNodes },
    revalidate: 3600, // 1 hour
  };
}

export default Country;
