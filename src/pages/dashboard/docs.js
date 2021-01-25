import React from 'react';

import Router from 'next/router';

import { useSession } from 'next-auth/client';

import Navbar from 'components/Header/Navbar';
import DataArchivesHeader from 'components/DataArchives/DataArchivesHeader';
import DataArchives from 'components/DataArchives/DataArchives';
import Tokens from 'components/Tokens';
import Footer from 'components/Footer';

function Data() {
  const [session, loading] = useSession();
  if (loading) return null;

  if (!loading && !session) {
    Router.push('/');
  }

  return (
    <>
      <Navbar />
      <DataArchivesHeader />
      <Tokens />
      <DataArchives />
      <Footer />
    </>
  );
}

export default Data;
