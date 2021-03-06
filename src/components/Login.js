import React from 'react';

import { Button, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSession, signIn } from 'next-auth/client';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    background: 'none',
  },
  loginButton: {
    marginBottom: '1rem',
    width: '100%',
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    backgroundColor: theme.palette.secondary.dark,
    fontWeight: 800,
    fontSize: theme.typography.subtitle2.fontSize,
    height: '3rem',
    [theme.breakpoints.up('lg')]: {
      fontSize: theme.typography.subtitle1.fontSize,
      height: '3.5rem',
      paddingLeft: '2rem',
      paddingRight: '2rem',
    },
  },
  buttonContainer: {
    paddingTop: '1rem',
    width: '400px',
    [theme.breakpoints.between('xs', 'xs')]: {
      width: '95vw',
    },
    '& .MuiLink-underlineHover': {
      '&:hover': {
        textDecoration: 'none',
      },
    },
  },
  footerInput: {
    // Moved to `App.css` due to difficult of setting input `text-align` to `center`
  },
  buttonLink: {
    textDecoration: 'none',
  },
  formStyles: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControlStyles: {
    width: '400px',
    marginBottom: '10px',
    [theme.breakpoints.between('xs', 'xs')]: {
      width: '95vw',
    },
  },
  inputLabel: {
    textAlign: 'initial',
    color: '#FFFFFF',
    transform: 'none',
    position: 'static',
  },
}));

function Login({ providers, ...props }) {
  const classes = useStyles(props);
  const [session, loading] = useSession();
  return (
    <Grid
      container
      justify="space-around"
      alignitems="center"
      className={classes.root}
    >
      <Grid item xs={12}>
        <form noValidate className={classes.formStyles}>
          <div className={classes.buttonContainer}>
            {!(loading || session) &&
              Object.values(providers).map((provider) => (
                <Button
                  key={provider.name}
                  value="Subscribe"
                  name="submit"
                  id="mc-embedded-subscribe-form"
                  variant="contained"
                  className={classes.loginButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => signIn(provider.id)}
                >
                  Sign in with {provider.name}
                </Button>
              ))}
          </div>
        </form>
      </Grid>
    </Grid>
  );
}

export default Login;
