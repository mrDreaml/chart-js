import React from 'react';
import constants from '../../constants/constants';


export default ({
  chartColumnsShow, currentColumnValues, colors, chartParams,
}) => {
  const {
    chartTop, chartLeft, chartHeight, yStep, xStep,
  } = chartParams;
  const dPaths = Object.entries(currentColumnValues).reduce((path, [colName, colValue]) => {
    if (colValue !== null && colName !== constants.colNameX && chartColumnsShow[colName]) {
      path[colName] = (currentColumnValues[colName].reduce((d, yValue, xValue) => {
        const yCoordinate = Math.round(chartTop + chartHeight - yValue * yStep);
        const xCoordinate = Math.round(chartLeft + xValue * xStep);
        if (xValue === 0) {
          return `M${xCoordinate} ${yCoordinate}`;
        }
        return d.concat(` L${xCoordinate} ${yCoordinate}`);
      }, ''));
    }
    return path;
  }, {});
  return (
    Object.entries(dPaths).map(([colName, dPath]) => <path d={dPath} stroke={colors[colName]} className="chart--path" />)
  );
};
