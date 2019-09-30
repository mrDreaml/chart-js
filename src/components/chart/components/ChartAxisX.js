import React from 'react';

export default ({ chartParams, chartColumnValues }) => {
  const {
    chartColumns, xStep, chartHeight, range,
  } = chartParams;

  if (xStep) {
    let { chartLeft, chartTop } = chartParams;

    if (chartLeft === undefined) {
      chartLeft = 0;
    }
    if (chartTop === undefined) {
      chartTop = 0;
    }
    const arr = [];
    let datesPointsQuantity = Math.floor((range[1] - range[0]) / chartColumns);
    datesPointsQuantity = datesPointsQuantity === 0 ? 1 : datesPointsQuantity;
    const yPos = chartTop + chartHeight + 30;
    for (let i = 0; i < chartColumnValues.length; i += datesPointsQuantity) {
      const xPos = chartLeft + (i - range[0]) * xStep;
      const dateValue = (() => {
        const dateValueS = new Date(chartColumnValues[i]).toDateString().split(' ');
        return [dateValueS[1], dateValueS[2]].join(' ');
      })();
      const align = xPos - (dateValue.length / 2) * 7.65; // TODO define number to calculate from font size
      arr.push(<text className="axis-x-values axis-values" key={`${dateValue + i}`} x={align} y={yPos}>{dateValue}</text>);
    }
    return arr;
  }
  return null;
};
