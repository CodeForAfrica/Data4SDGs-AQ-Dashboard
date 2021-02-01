import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';

import API, {
  COUNTRIES_LOCATION,
  dataByCountries,
  calculateAverage,
  sortCountries,
} from 'api';

import Navbar from 'components/Header/Navbar';
import Footer from 'components/Footer';
import SensorMap from 'components/SensorMap';
import QualityStatsGraph from 'components/City/QualityStatsGraph';
import HazardReading from 'components/City/HazardReadings';
import AQIndex from 'components/City/AQIndex';
import Resources from 'components/Resources';

import NotFound from 'pages/404';
import Filter from 'components/Filter';

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
    marginTop: '5rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '8.1rem',
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
}));

const DASHBOARD_PATHNAME = '/dashboard';

function Country({ country: countrySlug, data, errorCode, ...props }) {
  const classes = useStyles(props);
  const [session] = useSession();
  const [country, setCountry] = useState(countrySlug);
  const [yAxisLabels, setYAxisLAbel] = useState({
    yName: 'P1',
    yLabel: 'PM10',
  });
  const [hazardReading, setHazardReading] = useState({
    name: 'P1',
    label: 'PM10',
  });
  const { sortedCountries, sensorsDataByCountry } = data;
  useEffect(() => {
    if (!session) {
      Router.push('/');
    }
  }, [session]);

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
        <Grid
          item
          justify="center"
          container
          lg={12}
          id="graph"
          className={classes.graphContainer}
        >
          <Grid item xs={12}>
            {sensorsDataByCountry ? (
              <div>
                <Filter
                  onChange={(value) => {
                    setYAxisLAbel(JSON.parse(value));
                    setHazardReading({
                      label: JSON.parse(value).yLabel,
                      name: JSON.parse(value).yName,
                    });
                  }}
                />
                <Typography>
                  Air Quality in {COUNTRIES_LOCATION[country].label}
                </Typography>
                <QualityStatsGraph
                  {...yAxisLabels}
                  xLabel="Date"
                  data={sensorsDataByCountry}
                />
              </div>
            ) : null}
            {/* <Typography> Air Quality in Africa</Typography>
            <QualityStatsGraph {...yAxisLabels} data={africaData} /> */}
          </Grid>
          <Grid
            container
            alignItems="center"
            item
            xs={12}
            className={classes.hazardContainer}
          >
            <HazardReading
              hazardReading={hazardReading}
              data={sortedCountries}
            />
          </Grid>

          <Grid item lg={12} justify="center">
            <AQIndex />
          </Grid>
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
  const t0 = Date.now();
  const sensorsData = await API.getData();
  const t1 = Date.now();
  console.log(`Call to getData took ${t1 - t0} milliseconds.`);

  const sensorsDataByCountry = dataByCountries(sensorsData);
  let countryData;
  if (slug !== 'africa') {
    countryData = sensorsDataByCountry[slug];
    errorCode = countryData ? 200 : 404;
  }
  const africaData = { Africa: calculateAverage(sensorsData) };
  const sortedCountries = sortCountries(sensorsDataByCountry);

  const data = { sortedCountries, sensorsDataByCountry, africaData };
  return { props: { errorCode, country: slug, data } };
}

export default Country;
