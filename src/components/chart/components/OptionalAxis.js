import React from 'react';
import ChartAxisX from './ChartAxisX';
import ChartAxisY from './ChartAxisY';

export default ({
  enable, chartParams, inputData, width,
}) => (
  <>
    { enable && enable.axisX ? (
      <ChartAxisX chartParams={chartParams} chartColumnValues={inputData.columns.x} width={width} />
    ) : null }
    { enable && enable.axisY ? (
      <ChartAxisY chartParams={chartParams} globalYmaxValue={chartParams.yMaxValue} width={width} />
    ) : null}
  </>
);
