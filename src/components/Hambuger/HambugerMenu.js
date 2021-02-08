import React from 'react';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, MenuItem, Typography, MenuList } from '@material-ui/core';
import Link from 'components/Link';
import Modal from '@material-ui/core/Modal';
import { signOut } from 'next-auth/client';

import MenuButton from 'components/Hambuger/MenuButton';

const useStyles = makeStyles((theme) => ({
  grid: {
    flex: 1,
  },
  menuList: {
    color: 'white',
    marginTop: '5rem !important', // Override the default marginTop:'2rem' of <MenuList /> Component
    textAlign: 'right',
    [theme.breakpoints.up('sm')]: {
      marginTop: '2rem',
      paddingRight: '10%',
    },
  },
  menuListItem: {
    color: 'white',
    display: 'block',
  },
  modalContent: {
    margin: 'auto',
    padding: '20px',
    height: 'auto',
  },
  typography: {
    color: '#fff',
    textAlign: 'right',
    fontWeight: '700',
  },
  link: {
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

function HambugerMenu({ handleToggle, menuOpen }) {
  const classes = useStyles();
  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12}>
        <MenuButton
          open={menuOpen}
          onClick={handleToggle}
          onClose={handleToggle}
        />
      </Grid>
      <Grid item xs={12}>
        <Modal
          className={classes.modalContent}
          open={menuOpen}
          onClose={handleToggle}
          disableAutoFocus
        >
          <MenuList className={classes.menuList}>
            <Link href="/dashboard" className={classes.link}>
              <MenuItem className={classes.menuListItem}>
                <Typography className={classes.typography} variant="subtitle1">
                  MAP
                </Typography>
              </MenuItem>
            </Link>

            <Link href="/dashboard/docs" className={classes.link}>
              <MenuItem className={classes.menuListItem}>
                <Typography className={classes.typography} variant="subtitle1">
                  DATA API
                </Typography>
              </MenuItem>
            </Link>

            <Link href="/dashboard#resources" className={classes.link}>
              <MenuItem className={classes.menuListItem}>
                <Typography className={classes.typography} variant="subtitle1">
                  RESOURCES
                </Typography>
              </MenuItem>
            </Link>

            <MenuItem className={classes.menuListItem}>
              <Typography
                className={classes.typography}
                variant="subtitle1"
                onClick={signOut}
              >
                SIGN OUT
              </Typography>
            </MenuItem>
          </MenuList>
        </Modal>
      </Grid>
    </Grid>
  );
}

HambugerMenu.propTypes = {
  handleToggle: PropTypes.func.isRequired,
  menuOpen: PropTypes.bool.isRequired,
};

export default HambugerMenu;
