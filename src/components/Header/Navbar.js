import React from 'react';

import { signOut } from 'next-auth/client';

import {
  AppBar,
  Grid,
  MenuItem,
  Toolbar,
  Hidden,
  Button,
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import IconLogo from 'components/IconLogo';
import Link from 'components/Link';
import MenuBar from 'components/Header/MenuBar';
import SearchBar from 'components/SearchBar';

const useStyles = makeStyles((theme) => ({
  navBarText: {
    color: '#FFFFFF',
    transition: 'all .5s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      color: '#f3f33',
    },
    fontFamily: 'Anton',
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '12px',
      overflow: 'visible',
      paddingRight: 0,
    },
  },
  logoGrid: {
    [theme.breakpoints.down('sm')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      marginTop: '10px',
    },
  },
  navLink: {
    textDecoration: 'none',
    color: '#FFFFFF',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  navMenuBorder: {
    borderRight: '1px solid',
    padding: '0 1.5rem',
  },
  toolbar: {
    padding: '0 23px',
    margin: 0,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '0 5px',
    },
    [theme.breakpoints.up('md')]: {
      padding: 0,
      margin: '0 auto',
      width: '960px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: 0,
      margin: '0 auto',
      width: '1280px',
    },
    [theme.breakpoints.up('xl')]: {
      padding: 0,
      margin: '0 auto',
    },
  },
  root: {
    flexGrow: 1,
    maxWidth: '100%',
  },
  appBar: {
    backgroundColor: '#2FB56B',
    boxShadow: 'none',
  },
  navBarRoot: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      padding: '10px 0',
      justifyContent: 'flex-start',
    },
  },
  navBarPadding: {
    paddingLeft: '1.5rem',
  },
  titleContainer: {
    display: 'flex',
    fontFamily: 'Anton',
    transition: 'all .5s ease-in-out',
    paddingTop: '20px',
  },
  img: {
    height: '8rem',
    maxWidth: '100%',
  },
  searchBar: {
    padding: '10px 0',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      order: 2,
      padding: 0,
      marginTop: '20px',
    },
  },
  searchBarRoot: {
    flexGrow: 0,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '2rem',
    },
    [theme.breakpoints.down('sm')]: {
      flexGrow: 1,
    },
  },
  signOutButton: {
    marginLeft: '10px',
    width: '100px',
    color: theme.palette.secondary.main,
    fontFamily: 'Anton',
    fontWeight: 800,
    fontSize: '.8rem',
    height: '3rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
    },
  },
  fa: {
    transition: 'all .5s ease-in-out',
    padding: theme.spacing(0.5),
    '&:hover': {
      transform: 'scale(1.3)',
      color: '#f3f3f3',
    },
  },
}));

function Navbar({ handleSearch, ...props }) {
  const classes = useStyles(props);

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        {/* Position sticky is not universally supported so the attribute reverts to static when unavailable */}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar} disableGutters>
            <div className={classes.logoGrid}>
              <IconLogo />
            </div>
            <Grid container>
              <Grid
                item
                container
                lg={12}
                justify="space-between"
                classes={{ root: classes.navBarRoot }}
              >
                <Hidden only={['xs', 'sm']}>
                  <Grid
                    container
                    item
                    md={7}
                    classes={{ root: classes.navBarRoot }}
                  >
                    <MenuItem
                      classes={{ root: classes.navBarText }}
                      disableGutters
                    >
                      <Link
                        href="/dashboard#__next"
                        className={` ${classes.navLink} ${classes.navMenuBorder} `}
                      >
                        MAP
                      </Link>
                    </MenuItem>
                    <MenuItem
                      classes={{ root: classes.navBarText }}
                      disableGutters
                    >
                      <Link
                        href="/dashboard/docs"
                        className={` ${classes.navLink} ${classes.navMenuBorder} `}
                      >
                        Data API
                      </Link>
                    </MenuItem>
                    <MenuItem
                      className={` ${classes.navBarText} ${classes.navBarPadding} `}
                      disableGutters
                    >
                      <Link
                        href="/dashboard#resources"
                        className={classes.navLink}
                      >
                        RESOURCES
                      </Link>
                    </MenuItem>
                  </Grid>

                  <Grid item md={5} classes={{ root: classes.searchBar }}>
                    <SearchBar
                      handleSearch={handleSearch}
                      placeholder="Search for location"
                      classes={{ root: classes.searchBarRoot }}
                    />
                    <Hidden only={['xs', 'sm']}>
                      <Button
                        variant="text"
                        onClick={signOut}
                        classes={{
                          root: classes.signOutButton,
                        }}
                      >
                        <Typography className={classes.navBarText}>
                          Logout
                        </Typography>
                      </Button>
                    </Hidden>
                  </Grid>
                </Hidden>
                <Hidden only={['md', 'lg', 'xl']}>
                  <MenuBar />
                </Hidden>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default Navbar;
