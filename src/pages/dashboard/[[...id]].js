import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Router from 'next/router';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSession } from 'next-auth/client';

import API, { COUNTRIES_LOCATION, getFormattedWeeklyP2Stats } from 'api';

import Navbar from 'components/Header/Navbar';
import PartnerLogos from 'components/PartnerLogos';
import Footer from 'components/Footer';
import SensorMap from 'components/SensorMap';
import QualityStatsGraph from 'components/City/QualityStatsGraph';
import HazardReading from 'components/City/HazardReadings';
import AQIndex from 'components/City/AQIndex';

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
  hazardContainer: {
    flexDirection: 'column',
  },
}));

const DASHBOARD_PATHNAME = '/dashboard';

function Country({ country: countrySlug, data, errorCode, ...props }) {
  const classes = useStyles(props);
  const [session] = useSession();
  const [country, setCountry] = useState(countrySlug);

  const [isLoading, setIsLoading] = useState(false);
  const { weeklyP2 } = data;
  const [cityP2WeeklyStats, setCityP2WeeklyStats] = useState(
    getFormattedWeeklyP2Stats(weeklyP2)
  );

  useEffect(() => {
    if (!session) {
      Router.push('/');
    }
  }, [session]);

  useEffect(() => {
    const { city } = COUNTRIES_LOCATION[country];
    API.getWeeklyP2Data(city)
      .then((res) => res.json())
      .then((json) => setCityP2WeeklyStats(getFormattedWeeklyP2Stats(json)))
      .then(() => setIsLoading(false));
  }, [isLoading]);

  // if !data, 404
  if (!COUNTRIES_LOCATION[country] || errorCode >= 400) {
    return <NotFound />;
  }

  const handleSearch = (option) => {
    const searchedCountry = (option && option.value) || DEFAULT_COUNTRY;
    if (searchedCountry !== country) {
      setCountry(searchedCountry);
      setIsLoading(true);
      const countryUrl = `${DASHBOARD_PATHNAME}/[id]`;
      const countryAs = `${DASHBOARD_PATHNAME}/${searchedCountry}`;
      Router.push(countryUrl, countryAs, { shallow: true });
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
          <Grid item xs={12} lg={6}>
            {cityP2WeeklyStats.length > 0 ? (
              <div>
                <Typography>
                  Air Quality in {COUNTRIES_LOCATION[country].label}
                </Typography>

                <QualityStatsGraph
                  yLabel="PM2.5"
                  xLabel="Date"
                  data={{ name: country, data: cityP2WeeklyStats }}
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
            justify="center"
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
        <Grid item id="partners" className={classes.section} xs={12}>
          <PartnerLogos />
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
  const country = countryProps || DEFAULT_COUNTRY;
  const { city } = COUNTRIES_LOCATION[country];
  const airRes = await API.getAirData(city);
  const weeklyP2Res = await API.getWeeklyP2Data(city);
  let errorCode = airRes.statusCode > 200 && airRes.statusCode;

  errorCode =
    !errorCode && weeklyP2Res.statusCode > 200 && weeklyP2Res.statusCode;
  const air = (!errorCode && (await airRes.json())) || {};
  const weeklyP2 = (!errorCode && (await weeklyP2Res.json())) || {};
  const data = { air, weeklyP2 };
  // Pass data to the page via props
  return { props: { errorCode, country, data } };
}

export default Country;
