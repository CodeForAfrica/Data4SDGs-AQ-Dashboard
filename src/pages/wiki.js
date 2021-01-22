import React from 'react';

import Stories from 'components/About/Stories';
import Navbar from 'components/Header/Navbar';
import DataArchivesHeader from 'components/DataArchives/DataArchivesHeader';
import DataArchives from 'components/DataArchives/DataArchives';
import PartnerLogos from 'components/PartnerLogos';
import Footer from 'components/Footer';

function Data() {
  return (
    <>
      <Navbar />
      <DataArchivesHeader />
      <DataArchives />
      <Stories />
      <PartnerLogos />
      <Footer />
    </>
  );
}

export default Data;
