import React from 'react';

export default (props) => {
  const {
    chartParams, chartColumnValues, styles,
  } = props;
  const { xStep, yStep, chartHeight } = chartParams;
  return chartColumnValues.map((e, i) => {
    const x1Coordinate = (i - 1) * xStep;
    const x2Coordinate = i * xStep;
    const y1Coordinate = chartHeight - chartColumnValues[i - 1] * yStep;
    const y2Coordinate = chartHeight - chartColumnValues[i] * yStep;
    const key = `${x1Coordinate + x2Coordinate + y1Coordinate + y2Coordinate + i}chart`;
    return i !== 0
      ? (<line className={`chartLine ${i}`} key={key} x1={x1Coordinate} y1={y1Coordinate} x2={x2Coordinate} y2={y2Coordinate} {...styles} />) : null;
  });
};
