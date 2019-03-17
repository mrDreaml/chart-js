import React from 'react';

export default (props) => {
  const {
    chartParams, chartColumnValues,
  } = props;
  const {
    chartColumns, xAxisScale, xStep, containerHeight,
  } = chartParams;
  return Array(chartColumns).fill().map((e, i) => {
    i += 0.5; // values to center not to start
    const xPointValue = Math.round(i * xAxisScale);
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
    return <text className="axis-x-values axis-values" key={dateValue + i} x={marginBetweenPoints * (i)} y={containerHeight}>{dateValue}</text>;
  });
};
