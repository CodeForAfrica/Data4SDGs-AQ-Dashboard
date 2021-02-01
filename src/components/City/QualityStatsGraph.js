import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { formatDateTime } from 'lib';
import seedColor from 'seed-color';
import {
  VictoryChart,
  VictoryTheme,
  VictoryLine,
  VictoryAxis,
  VictoryLegend,
  VictoryLabel,
} from 'victory';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: '100%',
    display: 'block',
  },

  chartContainer: {
    textAlign: 'center',
    marginBottom: '3rem',
    marginLeft: '3.125rem',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      width: '59.625rem',
    },
    [theme.breakpoints.up('lg')]: {
      width: '79.5rem',
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: '0.625rem',
    },
  },
}));

function QualityStatsGraph({ data: dataProps, width, yLabel, xName, yName }) {
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
  const chartHeight = chartWidth * (6 / 12) + 20;

  if (!dataProps) {
    return null;
  }
  const legend = Object.keys(dataProps)
    .map((key) => ({ name: key }))
    .slice(0, 8);

  const ticks = dataProps[legend[0].name].map((value) => value.timestamp);
  const colors = legend.map((value) => seedColor(value.name).toHex());
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
            minDomain={{ y: 0 }}
            domainPadding={{ y: 100 }}
          >
            <VictoryAxis
              tickCount={2}
              tickValues={ticks}
              tickFormat={(timestamp) => `${formatDateTime(timestamp).time}`}
              style={{
                axis: {
                  stroke: 'rgba(0,0,0,0.1)',
                  strokeWidth: 1,
                },
                axisLabel: {
                  padding: 40,
                  fontSize: 18,
                  fontWeight: 'bold',
                },
                grid: {
                  stroke: 'rgba(0,0,0,0.1)',
                  strokeDasharray: '',
                },
                ticks: {
                  padding: -8,
                },
                tickLabels: {
                  fontFamily: '"Montserrat", "sans-serif"',
                  fontWeight: 'bold',
                  angle: labelAngle,
                  fontSize: 10,
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
                  padding: 40,
                  fontSize: 12,
                  fontWeight: 'bold',
                },
                grid: {
                  stroke: 'rgba(0,0,0,0.1)',
                  strokeDasharray: '',
                },
                tickLabels: {
                  fontFamily: '"Montserrat", "sans-serif"',
                  fontWeight: 'bold',
                  fontSize: 9,
                },
              }}
              fixLabelOverlap
            />
            <VictoryLegend
              x={40}
              y={chartHeight - 30}
              centerTitle
              orientation="horizontal"
              itemsPerRow={8}
              gutter={5}
              colorScale={colors}
              style={{ title: { fontSize: 5 } }}
              data={legend}
            />
            {legend.map((_, i) => (
              <VictoryLine
                data={dataProps[_.name]}
                name={_.name}
                interpolation="natural"
                x={xName}
                y={yName}
                style={{
                  data: { stroke: colors[i] },
                }}
              />
            ))}
            <VictoryLine
              samples={1}
              data={[
                { x: ticks[0], y: 50 },
                { x: ticks[ticks.length - 1], y: 50 },
              ]}
              labels={['', 'AQG Treshold']}
              style={{ data: { strokeDasharray: [5, 10] } }}
              labelComponent={<VictoryLabel renderInPortal dx={-20} dy={-20} />}
            />
          </VictoryChart>
        </div>
      </Grid>
    </Grid>
  );
}

QualityStatsGraph.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.arrayOf(PropTypes.shape({})),
  ]).isRequired,
  width: PropTypes.string.isRequired,
  yLabel: PropTypes.string,
  xName: PropTypes.string,
  yName: PropTypes.string,
};

QualityStatsGraph.defaultProps = {
  yLabel: 'Quality',
  xName: 'timestamp',
  yName: 'P2',
};

export default withWidth()(QualityStatsGraph);
