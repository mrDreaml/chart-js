import React from 'react';

export default (props) => {
  const {
    chartParams,
  } = props;
  const {
    chartRows, yAxisScale, yStep, chartWidth, chartHeight,
  } = chartParams;

  let { chartLeft, chartTop } = chartParams;

  if (chartLeft === undefined) {
    chartLeft = 0;
  }
  if (chartTop === undefined) {
    chartTop = 0;
  }

  return Array(chartRows).fill().map((e, i) => {
    const yPointValue = Math.round(i * yAxisScale);
    const marginBetweenPoints = yStep * yAxisScale;
    const xStartPosition = chartLeft;
    const xEndPosition = chartLeft + chartWidth;
    const yPosition = chartTop + chartHeight - marginBetweenPoints * (i);
    const key = yPointValue * marginBetweenPoints + i;
    const lineTopMargin = 10;
    return (
      <React.Fragment key={`${key}fragment`}>
        <text className="axis-y-values axis-values" key={`${key}axisY`} x={xStartPosition} y={yPosition - lineTopMargin}>{yPointValue}</text>
        <line className="axis-y-line" key={`${key}line`} x1={xStartPosition} y1={yPosition} x2={xEndPosition} y2={yPosition} />
      </React.Fragment>
    );
  });
};
