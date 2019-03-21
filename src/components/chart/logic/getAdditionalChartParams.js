export default function getAdditionalChartParams(columns) {
  const yMaxValue = (() => {
    let yMaxValueS;
    Object.defineProperty(columns, 'x', {
      enumerable: false,
    });

    Object.values(columns).forEach((column) => {
      if (column !== null) {
        const max = Math.max(...column);
        if (yMaxValueS === undefined || yMaxValueS < max) {
          yMaxValueS = max;
        }
      }
    });

    Object.defineProperty(columns, 'x', {
      enumerable: true,
    });
    return yMaxValueS;
  })();

  const yStep = (this.chartHeight) / yMaxValue;

  if (isNaN(yStep)) {
    return null;
  }
  
  const xStep = (this.chartWidth) / (columns.x.length - 1);
  if (this.chartColumns && this.chartRows) {
    const xAxisScale = (columns.x.length - 1) / this.chartColumns;
    const yAxisScale = yMaxValue / this.chartRows;
    return {
      xStep,
      yStep,
      xAxisScale,
      yAxisScale,
    };
  }
  return {
    xStep, yStep,
  };
}
