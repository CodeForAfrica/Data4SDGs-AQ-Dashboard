import React from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DataArchives from 'components/DataArchives//DataArchives';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    padding: '2.8rem 0rem',
    height: '80rem',
  },
  stylesTabRoot: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1,
    },
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '25%',
    backgroundColor: '#424143',
    color: 'white',
  },
}));

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
        <Typography
          variant="h5"
          style={{ color: 'white', padding: '2rem 0rem' }}
        >
          Sensors.AFRICA API
        </Typography>
        <Tab
          label="Authorization"
          {...a11yProps(1)}
          className={classes.tabLabel}
        />
        <Tab
          label="Sensors Data"
          {...a11yProps(2)}
          className={classes.tabLabel}
        />
      </Tabs>

      <TabPanel value={value} index={1}>
        {display}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataArchives />
      </TabPanel>
    </div>
  );
}

DrawerDocs.propTypes = {
  display: PropTypes.func.isRequired,
};

export default DrawerDocs;
