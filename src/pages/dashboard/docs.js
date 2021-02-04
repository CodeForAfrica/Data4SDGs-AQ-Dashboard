import React from 'react';

import Router from 'next/router';

import { useSession } from 'next-auth/client';

import DataArchives from 'components/DataArchives/DataArchives';
import Footer from 'components/Footer';
import Navigation from 'components/Navigation';
import Tokens from 'components/Tokens';
import Main from 'components/Docs/Main';

function Data({ tokens }) {
  const [session, loading] = useSession();
  if (loading) return null;

  if (!loading && !session) {
    Router.push('/');
  }

  return (
    <>
      <Navigation />
      <Tokens tokens={tokens} />
      <DataArchives />
      <Main />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const airNowToken = process.env.AIR_NOW || null;
  const airQOToken = process.env.AIRQO || null;
  const data4SDGToken = process.env.DATA4_DSGS || null;
  const purpleAirToken = process.env.PURPLE_AIR || null;
  const smartCitizenToken = process.env.SMART_CITIZEN || null;

  // Pass data to the page via props
  return {
    props: {
      tokens: {
        airNowToken,
        airQOToken,
        data4SDGToken,
        purpleAirToken,
        smartCitizenToken,
      },
    },
    revalidate: 300, // seconds
  };
}

export default Data;
