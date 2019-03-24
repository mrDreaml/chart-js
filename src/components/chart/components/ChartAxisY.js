import React from 'react';

const cacheAxisYValues = {};

export default ({ chartParams, globalYmaxValue }) => {
  if (cacheAxisYValues.hasOwnProperty([chartParams.yMaxValue, globalYmaxValue])) {
    return cacheAxisYValues[[chartParams.yMaxValue, globalYmaxValue]];
  }

  const {
    chartRows, yStep, chartWidth, chartHeight, yMaxValue,
  } = chartParams;

  let { chartLeft, chartTop } = chartParams;

  if (chartLeft === undefined) {
    chartLeft = 0;
  }
  if (chartTop === undefined) {
    chartTop = 0;
  }
  const arr = [];
  const pointsQuantity = Math.floor((yMaxValue) / chartRows);
  const xStartPos = chartLeft;
  const xEndPos = chartLeft + chartWidth;
  const lineTopMargin = 10;
  for (let i = 0; i < globalYmaxValue; i += pointsQuantity) {
    const yPos = chartTop + chartHeight - i * yStep;
    const key = `${i * pointsQuantity + i}yAxisValues`;
    arr.push(
      <React.Fragment key={`${key}fragment`}>
        <text className="axis-y-values axis-values" key={`${key}axisY`} x={xStartPos} y={yPos - lineTopMargin}>{i}</text>
        <line className="axis-y-line" key={`${key}line`} x1={xStartPos} y1={yPos} x2={xEndPos} y2={yPos} />
      </React.Fragment>,
    );
    cacheAxisYValues[[yMaxValue, globalYmaxValue]] = arr;
  }
  return arr;
};
