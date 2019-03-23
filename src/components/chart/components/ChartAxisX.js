import React from 'react';

export default ({ chartParams, chartColumnValues, range }) => {
  const {
    chartColumns, xStep, chartHeight,
  } = chartParams;

  let { chartLeft, chartTop } = chartParams;

  if (chartLeft === undefined) {
    chartLeft = 0;
  }
  if (chartTop === undefined) {
    chartTop = 0;
  }
  const arr = [];
  let datesPointsQuantity = Math.floor((Math.floor((range[1] - range[0]) / chartColumns) - 1) / chartColumns);
  datesPointsQuantity = datesPointsQuantity === 0 ? 1 : datesPointsQuantity;
  for (let i = 0; i < chartColumnValues.length; i += 1) {
    if (i % datesPointsQuantity === 0) {
      const xPointIndex = Math.round((i * chartColumns));
      const yPos = chartTop + chartHeight + 30;
      const xPos = chartLeft + (i * chartColumns - range[0]) * xStep;
      const dateValue = (() => {
        const dateValueS = new Date(chartColumnValues[xPointIndex]).toDateString().split(' ');
        return [dateValueS[1], dateValueS[2]].join(' ');
      })();
      arr.push(<text className="axis-x-values axis-values" key={`${dateValue + i}`} x={xPos} y={yPos}>{dateValue}</text>);
    }
  }
  return arr;
};
