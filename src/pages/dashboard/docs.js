import React from 'react';

import Router from 'next/router';

import { useSession } from 'next-auth/client';

import Navbar from 'components/Header/Navbar';
import DataArchives from 'components/DataArchives/DataArchives';
import Tokens from 'components/Tokens';
import Footer from 'components/Footer';

function Data({ tokens }) {
  const [session, loading] = useSession();
  if (loading) return null;

  if (!loading && !session) {
    Router.push('/');
  }

  return (
    <>
      <Navbar />
      <Tokens />
      <Tokens tokens={tokens} />
      <DataArchives />
      <Footer />
    </>
  );
}

export async function getStaticProps() {
  const purpleAirToken = process.env.PURPLE_AIR;
  const airQOToken = process.env.AIRQO;
  const openAQToken = process.env.OPENAQ;
  const data4SDGToken = process.env.DATA4_DSGS;

  // Pass data to the page via props
  return {
    props: {
      tokens: { purpleAirToken, airQOToken, openAQToken, data4SDGToken },
    },
    revalidate: 300, // seconds
  };
}

export default Data;
