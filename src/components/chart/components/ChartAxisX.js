import React from 'react';

export default (props) => {
  const {
    chartParams, chartColumnValues,
  } = props;
  const {
    chartColumns, xAxisScale, xStep, chartHeight,
  } = chartParams;

  let { chartLeft, chartTop } = chartParams;

  if (chartLeft === undefined) {
    chartLeft = 0;
  }
  if (chartTop === undefined) {
    chartTop = 0;
  }

  return Array(chartColumns).fill().map((e, i) => {
    i += 0.5; // values to center not to start
    const xPointValue = Math.round(i * xAxisScale);
    const yPos = chartTop + chartHeight + 30;
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
    return <text className="axis-x-values axis-values" key={dateValue + i} x={chartLeft + marginBetweenPoints * (i)} y={yPos}>{dateValue}</text>;
  });
};
