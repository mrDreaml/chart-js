function ChartJS(containerID, inputData) {
  const canvas = document.getElementById(containerID);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;


  const getStep = (columns) => {
    const xMaxValue = Math.max(...columns.x);
    const yMaxValue = (() => {
      this.yMaxValue = undefined;
      Object.defineProperty(columns, 'x', {
        enumerable: false,
      });

      Object.values(columns).forEach((column) => {
        const max = Math.max(...column);
        if (yMaxValue === undefined || yMaxValue < max) {
          this.yMaxValue = max;
        }
      });

      Object.defineProperty(columns, 'x', {
        enumerable: true,
      });
      return this.yMaxValue;
    })();


    const xStep = canvas.clientWidth / (columns.x.length - 1);
    const yStep = canvas.clientHeight / yMaxValue;
    const xAxisStep = Math.floor(xMaxValue / 6);
    const yAxisStep = Math.floor(yMaxValue / 5);

    return {
      x: xStep,
      y: yStep,
      xAxis: xAxisStep,
      yAxis: yAxisStep,
    };
  };

  const drawChart = (chartData) => {
    const { columns } = chartData;
    const step = getStep(columns);
    console.log(step.x, step.y);

    const ctx = canvas.getContext('2d');
    columns.x.forEach((xValue, xIndex) => {
      ctx.beginPath();
      ctx.arc(3 + xIndex * step.x, canvas.height - 3 - columns.y0[xIndex] * step.y, 2, 0, 2 * Math.PI);
      ctx.stroke();
    });
  };


  drawChart(inputData);

  this.render = () => canvas;
}

export default ChartJS;
