import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  typography: {
    paddingTop: '1.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 700,
    fontSize: '1rem',
    paddingTop: '2rem',
    paddingBottom: '1rem',
  },
  dlFirst: {
    padding: '1rem 0.5rem',
    borderTop: '1px solid #f0f4f7',
    borderBottom: '1px solid #f0f4f7',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  dl: {
    padding: '2rem 0.5rem',
    borderBottom: '1px solid #f0f4f7',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  dt: {
    marginBottom: '0.5rem',
  },

  code: {
    display: 'inline-block',
    fontSize: theme.typography.caption.fontSize,
    backgroundColor: '#fafafa',
    bordeRadius: '4px',
    padding: '0.5rem',
    color: '#1a995b',
  },
  query: {
    fontSize: theme.typography.caption.fontSize,
  },
  queryParam: {
    color: theme.palette.primary.dark,
    fontSize: theme.typography.caption.fontSize,
  },
  queryDescription: {
    fontSize: theme.typography.caption.fontSize,
  },
  var: {
    color: theme.palette.primary.dark,
    fontStyle: 'italic',
    fontSize: theme.typography.caption.fontSize,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#1a995b',
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'white',
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'white',
    },
  },
}))(TableRow);

function createData(endpoint, usage) {
  return { endpoint, usage };
}

const apiV1Node =
  'http://api.sensors.africa/v1/node?&location__country=country';
const apiV2Data =
  'http://api.sensors.africa/v2/data?&location__country=country&timestamp__gte=timestamp';
const country = '{country}';
const timestamp = '{timestamp}';

export default function DataArchivesCustomTable() {
  const classes = useStyles();

  const rows = [
    createData(
      <Grid item className={classes.dt}>
        <a
          className={classes.link}
          href="http://api.sensors.africa/v1/node/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <code className={classes.code}>{apiV1Node}</code>
        </a>
      </Grid>,
      <Grid item className={classes.dd}>
        <Typography variant="body2" component="p">
          List all nodes belonging to the authenticated user or network
          identified by the provided <code>ACCESS_TOKEN</code>
        </Typography>
        <Typography variant="body2" style={{ padding: '0.8rem 0rem' }}>
          Supported queries are:
        </Typography>
        <Typography
          variant="body2"
          component="ul"
          style={{ listStyle: 'none', marginTop: '0.5rem' }}
        >
          <li className={classes.query}>
            <code className={classes.queryParam}>location__country</code>={' '}
            <code className={classes.queryDescription}>{country}</code>: Return
            list of nodes located in a given country only e.g.{' '}
            <code className={classes.var}>kenya</code> ,
            <code className={classes.var}>uganda</code>
          </li>
        </Typography>
      </Grid>
    ),
    createData(
      <Grid item className={classes.dt} style={{ paddingRight: '15rem' }}>
        <a
          className={classes.link}
          href="https://api.sensors.africa/v2/data"
          target="_blank"
          rel="noopener noreferrer"
        >
          <code className={classes.code}>{apiV2Data}</code>
        </a>
      </Grid>,
      <Grid item className={classes.dd}>
        <Typography variant="body2" component="p">
          Provides <em>raw</em> sensor data of all nodes from a network
          identified by the provided <code>ACCESS_TOKEN</code>
        </Typography>
        <Typography variant="body2" style={{ padding: '0.8rem 0rem' }}>
          Supported queries are:
        </Typography>
        <Typography
          variant="body2"
          component="ul"
          style={{ listStyle: 'none', marginTop: '0.5rem' }}
        >
          <li className={classes.query}>
            <code className={classes.queryParam}>location__country</code>={' '}
            <code className={classes.queryDescription}>{country}</code>: Return
            data from all sensors located in a given country only e.g.{' '}
            <code className={classes.var}>kenya</code> ,
          </li>
          <li className={classes.query}>
            {' '}
            <code className={classes.queryParam}>timestamp__gte</code>={' '}
            <code className={classes.queryDescription}>{timestamp}</code>:
            Return sensor data measurements greater than or equal to the given
            timestamp e.g.{' '}
            <code className={classes.var}>2021-01-12T12:29:21.428563Z</code>
          </li>
        </Typography>
      </Grid>
    ),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Endpoints</StyledTableCell>
            <StyledTableCell align="right">Usage</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.endpoint}>
              <StyledTableCell component="th" scope="row">
                {row.endpoint}
              </StyledTableCell>
              <StyledTableCell align="right">{row.usage}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
