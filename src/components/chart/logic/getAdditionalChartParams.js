export default function getAdditionalChartParams({ chartHeight, chartWidth, chartColumns, chartRows }, columns) {
  if (columns) {
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

    const yStep = (chartHeight) / yMaxValue;

    if (isNaN(yStep)) {
      return null;
    }

    const xStep = (chartWidth) / (columns.x.length - 1);
    if (chartColumns && chartRows) {
      return {
        xStep,
        yStep,
        yMaxValue,
      };
    }
    console.error('no chartColumns or ChartRows!');
    return;
  } else {
    console.error('no columns!');
    return {};
  }
}
