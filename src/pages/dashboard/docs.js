import React, { useEffect } from 'react';

import Router from 'next/router';

import { useSession } from 'next-auth/client';

import Navbar from 'components/Header/Navbar';
import DataArchivesHeader from 'components/DataArchives/DataArchivesHeader';
import DataArchives from 'components/DataArchives/DataArchives';
import Tokens from 'components/Tokens';
import Footer from 'components/Footer';

function Data() {
  const [session] = useSession();
  useEffect(() => {
    if (!session) {
      Router.push('/');
    }
  }, [session]);

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
