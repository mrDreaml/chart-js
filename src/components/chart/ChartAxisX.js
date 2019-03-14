import React from 'react';

export default (props) => {
  const {
    chartParams, chartColumnValues, styles,
  } = props;
  const {
    chartColumns, xAxisScale, xStep, height,
  } = chartParams;
  return Array(chartColumns).fill().map((e, i) => {
    const xPointValue = i * xAxisScale;
    const marginBetweenPoints = xStep * xAxisScale;
    const dateValue = (() => {
      let dateValueS;
      dateValueS = new Date(chartColumnValues[xPointValue]).toDateString();
      dateValueS = dateValueS.split(' ');
      dateValueS.shift();
      dateValueS.pop();
      dateValueS = dateValueS.join(' ');
      return dateValueS;
    })();
    return <text key={dateValue} x={marginBetweenPoints * (i + 0.5)} y={height} {...styles}>{dateValue}</text>;
  });
};
