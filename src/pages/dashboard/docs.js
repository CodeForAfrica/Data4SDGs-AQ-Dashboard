import React from 'react';

import Navbar from 'components/Header/Navbar';
import DataArchivesHeader from 'components/DataArchives/DataArchivesHeader';
import DataArchives from 'components/DataArchives/DataArchives';
import Tokens from 'components/Tokens';
import PartnerLogos from 'components/PartnerLogos';
import Footer from 'components/Footer';

function Data() {
  return (
    <>
      <Navbar />
      <DataArchivesHeader />
      <Tokens />
      <DataArchives />
      <PartnerLogos />
      <Footer />
    </>
  );
}

export default Data;
