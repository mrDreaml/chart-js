import React from 'react';

export default function MoveElement(props) {
  const { chartParamsMap, range, callbackEvent } = props;
  const { xStep } = chartParamsMap;
  const height = chartParamsMap.chartHeight;
  const leftWidth = range[0] * xStep;
  const selectedWidth = (range[1] - range[0]) * xStep;
  const rightWidth = leftWidth + selectedWidth;
  const width = 10;
  return (
    <React.Fragment>
      <rect onMouseDown={e => callbackEvent(e, 0)} onMouseUp={callbackEvent} className="focus-move-element" height={height} width={width} x={leftWidth} />
      <rect onMouseDown={e => callbackEvent(e, 1)} onMouseUp={callbackEvent} className="focus-move-element" height={height} width={width} x={rightWidth} />
    </React.Fragment>
  );
}
