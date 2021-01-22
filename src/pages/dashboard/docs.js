import React from 'react';

import Navbar from 'components/Header/Navbar';
import DataArchivesHeader from 'components/DataArchives/DataArchivesHeader';
import DataArchives from 'components/DataArchives/DataArchives';
import Tokens from 'components/Tokens';
import Footer from 'components/Footer';

function Data() {
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
