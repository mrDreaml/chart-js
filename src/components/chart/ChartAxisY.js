import React from 'react';

export default (props) => {
  const {
    chartParams, styles,
  } = props;
  const {
    chartRows, yAxisScale, yStep, width, height,
  } = chartParams;
  const { lineStyle, textStyle } = styles;
  return Array(chartRows).fill().map((e, i) => {
    const yPointValue = i * yAxisScale;
    const marginBetweenPoints = yStep * yAxisScale;
    const xStartPosition = 0;
    const xEndPosition = width;
    const yPosition = height - marginBetweenPoints * (i + 0.5);
    const key = yPointValue * marginBetweenPoints;
    const lineTopMargin = 10;
    return (
      <React.Fragment>
        <text key={`${key}axisY`} x={xStartPosition} y={yPosition - lineTopMargin} {...textStyle}>{yPointValue}</text>
        <line key={`${key}line`} x1={xStartPosition} y1={yPosition} x2={xEndPosition} y2={yPosition} {...lineStyle} />
      </React.Fragment>
    );
  });
};
