export default function getAdditionalChartParams(columns) {
  const yMaxValue = (() => {
    this.yMaxValue = undefined;
    Object.defineProperty(columns, 'x', {
      enumerable: false,
    });

    Object.values(columns).forEach((column) => {
      const max = Math.max(...column);
      if (this.yMaxValue === undefined || this.yMaxValue < max) {
        this.yMaxValue = max;
      }
    });

    Object.defineProperty(columns, 'x', {
      enumerable: true,
    });
    return this.yMaxValue;
  })();

  const xStep = (this.containerWidth) / columns.x.length;
  const yStep = (this.containerHeight) / yMaxValue;
  const xAxisScale = Math.floor(columns.x.length / this.chartColumns);
  const yAxisScale = Math.floor(yMaxValue / this.chartRows);

  return {
    xStep,
    yStep,
    xAxisScale,
    yAxisScale,
  };
}
