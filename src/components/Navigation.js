import React, { useState } from 'react';

import Router from 'next/router';

import Navbar from 'components/Header/Navbar';

const DEFAULT_LOCATION = 'africa';

const DASHBOARD_PATHNAME = '/dashboard';

function Navigation({ location: locationProp }) {
  const [location, setLocation] = useState(locationProp);

  const handleSearch = (option) => {
    const searchedLocation = (option && option.value) || DEFAULT_LOCATION;
    if (!location?.length || searchedLocation !== location) {
      setLocation(searchedLocation);
      const locationUrl = `${DASHBOARD_PATHNAME}/[[...id]]`;
      const locationAs = `${DASHBOARD_PATHNAME}/${searchedLocation}`;
      Router.push(locationUrl, locationAs);
    }
  };

  return <Navbar handleSearch={handleSearch} />;
}

Navigation.propTypes = {};
Navigation.defaultProps = {};

export default Navigation;
