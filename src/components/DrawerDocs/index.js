import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DataArchives from 'components/DataArchives//DataArchives';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3} style={{ width: '80vw' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    padding: '10rem 0rem',
    height: '100rem',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '25%',
  },
  tabLabel: {},
}));

function DrawerDocs({ display }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab
          label="Authorization"
          {...a11yProps(0)}
          className={classes.tabLabel}
        />
        <Tab label="Sensors Data" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {display}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataArchives />
      </TabPanel>
    </div>
  );
}

DrawerDocs.propTypes = {
  display: PropTypes.func.isRequired,
};

export default DrawerDocs;
