import React from 'react';

export default (props) => {
  const {
    chartParams, globalYmaxValue,
  } = props;
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
  const pointsQuantity = Math.floor((Math.floor((yMaxValue) / chartRows) - 1) / chartRows);
  for (let i = 0; i < globalYmaxValue; i += 1) {
    if (i % pointsQuantity === 0) {
      const yPointValue = Math.round(i * chartRows);
      const yPos = chartTop + chartHeight - (i * chartRows) * yStep;
      const xStartPos = chartLeft;
      const xEndPos = chartLeft + chartWidth;
      const key = `${yPointValue * pointsQuantity + i}yAxisValues`;
      const lineTopMargin = 10;
      arr.push(
        <React.Fragment key={`${key}fragment`}>
          <text className="axis-y-values axis-values" key={`${key}axisY`} x={xStartPos} y={yPos - lineTopMargin}>{yPointValue}</text>
          <line className="axis-y-line" key={`${key}line`} x1={xStartPos} y1={yPos} x2={xEndPos} y2={yPos} />
        </React.Fragment>,
      );
    }
  }
  return arr;
};
