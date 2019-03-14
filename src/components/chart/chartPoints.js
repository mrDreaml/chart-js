import React from 'react';

function chartPoints(props) {
  const { chartParams, columns } = props; // eslint-disable-line
  console.log('+', chartParams, columns);
  const style = {
    stroke: '#FF0000',
    strokeWidth: '2',
  };

  const {
    xStep, yStep, xAxisScale, yAxisScale, containerHeight,
  } = chartParams;

  const putPoints = chartColor => columns.x.map((e, i) => {
    const x1Coordinate = (i - 1) * xStep;
    const x2Coordinate = i * xStep;
    const y1Coordinate = containerHeight - columns.y0[i - 1] * yStep;
    const y2Coordinate = containerHeight - columns.y0[i] * yStep;
    const key = x1Coordinate + x2Coordinate + y1Coordinate + y2Coordinate + chartColor;
    return i !== 0
      ? (<line key={key} x1={x1Coordinate} y1={y1Coordinate} x2={x2Coordinate} y2={y2Coordinate} {...style} />) : null;
  });

  return (
    putPoints('#FF0000')
  );
}

export default chartPoints;

// draw chart points
// draw axis
