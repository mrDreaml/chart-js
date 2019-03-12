function ChartJS(containerID, inputData) {
  const canvas = document.getElementById(containerID);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const chartRows = 5;
  const chartColumns = 6;
  const xAxisPadding = 30;
  const yAxisPadding = 30;


  const getChartParameters = (columns) => {
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

    const xStep = (canvas.clientWidth - yAxisPadding * 2) / columns.x.length;
    const yStep = (canvas.clientHeight - xAxisPadding * 2) / yMaxValue;
    const xAxisScale = Math.floor(columns.x.length / chartColumns);
    const yAxisScale = Math.floor(yMaxValue / chartRows);

    return {
      xStep,
      yStep,
      xAxisScale,
      yAxisScale,
    };
  };

  const drawChart = (chartData) => {
    const { columns } = chartData;
    const {
      xStep, yStep, xAxisScale, yAxisScale,
    } = getChartParameters(columns);
    console.log(columns);

    const ctx = canvas.getContext('2d');
    columns.x.forEach((xValue, xIndex) => {
      ctx.beginPath();
      ctx.arc(3 + xIndex * xStep + yAxisPadding, canvas.height - columns.y0[xIndex] * yStep - xAxisPadding, 2, 0, 2 * Math.PI);
      ctx.stroke();
    });

    Array(chartColumns).fill().forEach((e, i) => {
      ctx.beginPath();
      const xPointValue = i * xAxisScale;
      const widthBetweenPoints = xStep * xAxisScale;
      ctx.strokeStyle = '#FF0000';
      ctx.strokeText(columns.x[xPointValue], widthBetweenPoints * (i + 0.5) + 3, canvas.height - 1);
    });
  };


  drawChart(inputData);

  this.render = () => canvas;
}

export default ChartJS;
