import React from 'react';

export default (props) => {
  const {
    chartParams,
  } = props;
  const {
    chartRows, yAxisScale, yStep, chartWidth, chartHeight,
  } = chartParams;
  return Array(chartRows).fill().map((e, i) => {
    const yPointValue = i * yAxisScale;
    const marginBetweenPoints = yStep * yAxisScale;
    const xStartPosition = 0;
    const xEndPosition = chartWidth;
    const yPosition = chartHeight - marginBetweenPoints * (i);
    const key = yPointValue * marginBetweenPoints;
    const lineTopMargin = 10;
    return (
      <React.Fragment>
        <text className="axis-y-values axis-values" key={`${key}axisY`} x={xStartPosition} y={yPosition - lineTopMargin}>{yPointValue}</text>
        <line className="axis-y-line" key={`${key}line`} x1={xStartPosition} y1={yPosition} x2={xEndPosition} y2={yPosition} />
      </React.Fragment>
    );
  });
};
