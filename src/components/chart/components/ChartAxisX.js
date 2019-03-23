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
  const arr = [];
  for (let i = 0; i < chartColumns; i += 1) {
    const xPointValue = Math.round((i + 0.5) * xAxisScale);
    const yPos = chartTop + chartHeight + 30;
    const marginBetweenPoints = xStep * xAxisScale;
    const dateValue = (() => {
      const dateValueS = new Date(chartColumnValues[xPointValue]).toDateString().split(' ');
      return [dateValueS[1], dateValueS[2]].join(' ');
    })();
    arr.push(<text className="axis-x-values axis-values" key={`${dateValue + i}`} x={chartLeft + marginBetweenPoints * (i)} y={yPos}>{dateValue}</text>);
  }
  return arr;
};
