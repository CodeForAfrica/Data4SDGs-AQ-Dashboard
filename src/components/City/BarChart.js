import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { VictoryChart, VictoryTheme, VictoryBar, VictoryAxis } from 'victory';
import seedColor from 'seed-color';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'block',
    maxWidth: '100%',
  },
  chartContainer: {
    textAlign: 'center',
    marginBottom: '3rem',
    width: '100%',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '79.5rem',
    },
  },
}));

function BarChart({ data:dataProps, width, xLabel, yLabel }) {
  const classes = useStyles();
  let chartWidth = window.innerWidth;
  let labelAngle = 45;
  if (isWidthUp('md', width)) {
    chartWidth = 59.625 * 16;
    labelAngle = 0;
    if (isWidthUp('lg', width)) {
      chartWidth = 79.5 * 8;
    }
  }
  const chartHeight = chartWidth * (6 / 16) + 20;

  if (!dataProps) {
    return null;
  }

  const data = dataProps.sort((a,b)=>b.count-a.count).slice(0,6) //sort descending


  const colors = data.map((value) => seedColor(value.name).toHex());

  return (
    <Grid
      container
      color="secondary"
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <div className={classes.chartContainer}>
          <VictoryChart
            theme={VictoryTheme.material}
            style={{ parent: { width: '100%' } }}
            height={chartHeight}
            width={chartWidth}
            domainPadding={{ x: 120 }}
          >
            <VictoryAxis
              label={xLabel}
              style={{
                axis: {
                  stroke: 'rgba(0,0,0,0.1)',
                  strokeWidth: 1,
                },
                axisLabel: {
                  padding: 30,
                  fontSize: 18,
                  fontWeight: 'bold',
                },
                grid: {
                  stroke: 'rgba(0,0,0,0.1)',
                  strokeDasharray: '',
                },
                ticks: {
                  // padding: 20
                },
                tickLabels: {
                  fontFamily: '"Montserrat", "sans-serif"',
                  fontWeight: 'bold',
                  angle: labelAngle,
                },
              }}
            />
            <VictoryAxis
              label={yLabel}
              dependentAxis
              style={{
                axis: {
                  stroke: 'rgba(0,0,0,0.1)',
                  strokeWidth: 1,
                },
                axisLabel: {
                  padding: 30,
                  fontSize: 16,
                  fontWeight: 'bold',
                },
                grid: {
                  stroke: 'rgba(0,0,0,0.1)',
                  strokeDasharray: '',
                },
                tickLabels: {
                  fontFamily: '"Montserrat", "sans-serif"',
                  fontWeight: 'bold',
                  fontSize: 8
                },
              }}
              fixLabelOverlap
            />

            <VictoryBar
              data={data}
              x="name"
              y="count"
              style={{
                data: {
                  fill: ({ index }) => colors[index],
                },
              }}
            />
          </VictoryChart>
        </div>
      </Grid>
    </Grid>
  );
}

BarChart.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
  width: PropTypes.string.isRequired,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
};

BarChart.defaultProps = {
  xLabel: 'Networks',
  yLabel: 'Nodes',
};

export default withWidth()(BarChart);
