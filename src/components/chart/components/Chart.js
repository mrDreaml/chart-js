import React from 'react';
import constants from '../../constants/constants';

const Line = ({
  chartParams, chartColumnValues, styles,
}) => {
  const {
    xStep, yStep, chartHeight,
  } = chartParams;
  let { chartLeft, chartTop } = chartParams;

  if (chartLeft === undefined) {
    chartLeft = 0;
  }
  if (chartTop === undefined) {
    chartTop = 0;
  }
  const renderData = chartColumnValues.map((e, i) => {
    const x1Coordinate = chartLeft + (i - 1) * xStep;
    const x2Coordinate = chartLeft + i * xStep;
    const y1Coordinate = chartTop + chartHeight - chartColumnValues[i - 1] * yStep;
    const y2Coordinate = chartTop + chartHeight - chartColumnValues[i] * yStep;
    const key = `${x1Coordinate + x2Coordinate + y1Coordinate + y2Coordinate + i}chart`;
    return i !== 0
      ? (<line className={`chartLine ${i}`} key={key} x1={x1Coordinate} y1={y1Coordinate} x2={x2Coordinate} y2={y2Coordinate} {...styles} />) : null;
  });
  return renderData;
};


export default ({ chartColumnsShow, currentColumnValues, colors, chartParams }) => (
  Object.values(chartColumnsShow).includes(true)
    ? (
      <>
        {Object.entries(currentColumnValues).map((col, i) => {
          const [colName, colValue] = col;
          if (colValue !== null && colName !== constants.colNameX) {
            const chartStyle = {
              stroke: colors[colName],
            };
            const key = colName + colValue[i];
            return (
              <Line
                key={key}
                chartParams={chartParams}
                chartColumnValues={colValue}
                styles={chartStyle}
              />
            );
          }
          return null;
        })}
      </>
    )
    : null
);
