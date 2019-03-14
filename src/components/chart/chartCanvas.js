function ChartJS(containerID, inputData) {
  const canvas = document.getElementById(containerID);
  console.log(canvas);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  const chartLineWidth = 3;
  const chartAxisDotsColor = '#CCCCCC';
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

    const putPoints = (chartValues, chartColor) => {
      ctx.beginPath();
      ctx.strokeStyle = chartColor || '#000000';
      ctx.lineWidth = chartLineWidth || 1;

      columns.x.forEach((e, i) => {
        const xCoordinate = 3 + i * xStep + yAxisPadding;
        const yCoordinate = canvas.height - chartValues[i] * yStep - xAxisPadding;
        if (i !== 0) {
          ctx.lineTo(xCoordinate, yCoordinate);
        } else {
          ctx.moveTo(xCoordinate, yCoordinate);
        }
        ctx.stroke();
      });
      ctx.lineWidth = 1;
    };
    putPoints(columns.y0, '#FF0000');
    putPoints(columns.y1, '#00FF00');

    Array(chartColumns).fill().forEach((e, i) => {
      ctx.beginPath();
      
      ctx.strokeStyle = chartAxisDotsColor || '#000000';
      const xPointValue = i * xAxisScale;
      const widthBetweenPoints = xStep * xAxisScale;
      const dateValue = (() => {
        this.dateValue = new Date(columns.x[xPointValue]).toDateString();
        this.dateValue = this.dateValue.split(' ');
        this.dateValue.shift();
        this.dateValue.pop();
        this.dateValue = this.dateValue.join(' ');
        return this.dateValue;
      })();
      ctx.strokeText(dateValue, widthBetweenPoints * (i + 0.5) + 3, canvas.height - 1);
    });
  };


  drawChart(inputData);

  this.render = () => canvas;
}

export default ChartJS;