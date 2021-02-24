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
} from '@material-ui/core';

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(network, tokens) {
  return { network, tokens };
}

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTable({ tokens, ...props }) {
  const classes = useStyles(props);
  const {
    airNowToken,
    airQOToken,
    data4SDGToken,
    purpleAirToken,
    smartCitizenToken,
  } = tokens;

  const rows = [
    createData('AirNow', airNowToken),
    createData('AirQO', airQOToken),
    createData('Data4DSGs', data4SDGToken),
    createData('PurpleAir', purpleAirToken),
    createData('SmartCitizen', smartCitizenToken),
  ];

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Network</StyledTableCell>
            <StyledTableCell align="right">Token</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.network}>
              <StyledTableCell component="th" scope="row">
                {row.network}
              </StyledTableCell>
              <StyledTableCell align="right">{row.tokens}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
