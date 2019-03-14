export default function getAdditionalChartParams(columns) {
  const yMaxValue = (() => {
    let yMaxValueS;
    Object.defineProperty(columns, 'x', {
      enumerable: false,
    });

    Object.values(columns).forEach((column) => {
      const max = Math.max(...column);
      if (yMaxValueS === undefined || yMaxValueS < max) {
        yMaxValueS = max;
      }
    });

    Object.defineProperty(columns, 'x', {
      enumerable: true,
    });
    return yMaxValueS;
  })();

  const xStep = (this.width) / columns.x.length;
  const yStep = (this.height) / yMaxValue;
  const xAxisScale = Math.floor(columns.x.length / this.chartColumns);
  const yAxisScale = Math.floor(yMaxValue / this.chartRows);

  return {
    xStep,
    yStep,
    xAxisScale,
    yAxisScale,
  };
}
