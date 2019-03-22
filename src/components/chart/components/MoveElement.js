import React from 'react';

export default function MoveElement(props) {
  const { chartParamsMap, range, callbackEvent } = props;
  const { xStep } = chartParamsMap;
  const borderWidth = 20;
  const height = chartParamsMap.chartHeight;
  const leftWidth = range[0] * xStep;
  const selectedWidth = (range[1] - range[0]) * xStep;
  const rightWidth = leftWidth + selectedWidth - borderWidth;
  return (
    <React.Fragment>
      <rect onMouseDown={e => callbackEvent(e, 0)} onTouchStart={e => callbackEvent(e, 0)} onMouseUp={callbackEvent} onTouchEnd={callbackEvent} className="focus-move-element" height={height} width={borderWidth} x={leftWidth} />
      <rect onMouseDown={e => callbackEvent(e, [0, 1])} onTouchStart={e => callbackEvent(e, [0, 1])} onMouseUp={callbackEvent} onTouchEnd={callbackEvent} className="focus-move-element-scroll" height={height} width={selectedWidth - borderWidth - borderWidth} x={leftWidth + borderWidth} />
      <rect onMouseDown={e => callbackEvent(e, 1)} onTouchStart={e => callbackEvent(e, 1)} onMouseUp={callbackEvent} onTouchEnd={callbackEvent} className="focus-move-element" height={height} width={borderWidth} x={rightWidth} />
    </React.Fragment>
  );
}
