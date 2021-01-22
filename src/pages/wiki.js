import React from 'react';

import Stories from 'components/About/Stories';
import Navbar from 'components/Header/Navbar';
import DataArchivesHeader from 'components/DataArchives/DataArchivesHeader';
import DataArchives from 'components/DataArchives/DataArchives';
import EmbedDocumentation from 'components/EmbedDocumentation';
import PartnerLogos from 'components/PartnerLogos';
import Footer from 'components/Footer';

function Data() {
  return (
    <>
      <Navbar />
      <DataArchivesHeader />
      <DataArchives />
      <EmbedDocumentation />
      <Stories />
      <PartnerLogos />
      <Footer />
    </>
  );
}

export default Data;
