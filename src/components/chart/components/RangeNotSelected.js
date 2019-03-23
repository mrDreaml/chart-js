import React from 'react';

export default ({ chartParamsMap, range, callbackEvent }) => {
  const { xStep, chartWidth } = chartParamsMap;
  const height = chartParamsMap.chartHeight;
  const leftWidth = range[0] * xStep;
  const selectedWidth = (range[1] - range[0]) * xStep;
  const rightWidth = chartWidth - leftWidth - selectedWidth;
  const leftX = 0;
  const rightX = chartWidth - rightWidth;
  return (
    <React.Fragment>
      <rect onMouseUp={callbackEvent} className="not-selected-bg-map" height={height} width={leftWidth} x={leftX} />
      <rect onMouseUp={callbackEvent} className="not-selected-bg-map" height={height} width={rightWidth >= 0 ? rightWidth : 0} x={rightX} />
    </React.Fragment>
  );
};
