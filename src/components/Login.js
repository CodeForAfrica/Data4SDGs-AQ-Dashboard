import React, { useState } from 'react';

import {
  Button,
  Grid,
  Input,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Link from 'components/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'white',
    background: 'none',
  },
  footerButton: {
    width: '100%',
    marginTop: '10px',
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

function Login(props) {
  const classes = useStyles(props);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();

    // const data = { email: email, password: password };
  };

  return (
    <Grid
      container
      justify="space-around"
      alignitems="center"
      className={classes.root}
    >
      <Grid item xs={12}>
        <form noValidate className={classes.formStyles} onSubmit={onFormSubmit}>
          <FormControl classes={{ root: classes.formControlStyles }}>
            <InputLabel classes={{ root: classes.inputLabel }} htmlFor="email">
              Email address:{' '}
            </InputLabel>
            <Input
              id="email"
              type="email"
              name="MERGE0"
              value={email}
              placeholder="you@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="Email-input"
            />
          </FormControl>

          <FormControl classes={{ root: classes.formControlStyles }}>
            <InputLabel
              classes={{ root: classes.inputLabel }}
              htmlFor="password"
            >
              Password:
            </InputLabel>
            <Input
              id="password"
              type="password"
              name="MERGE0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="Email-input"
            />
          </FormControl>

          <div className={classes.buttonContainer}>
            <Button
              value="Subscribe"
              type="submit"
              name="submit"
              id="mc-embedded-subscribe-form"
              variant="contained"
              className={classes.footerButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              LOGIN
            </Button>
            <Link href="/api/auth/signin">
              <Button
                value="Subscribe"
                type="submit"
                name="submit"
                id="mc-embedded-subscribe-form"
                variant="contained"
                className={classes.footerButton}
                target="_blank"
                rel="noopener noreferrer"
              >
                SIGN IN WITH GOOGLE
              </Button>
            </Link>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}

export default Login;
