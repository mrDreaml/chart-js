export default function getNotificationRenderData(e) {
  const posChartX = e.pageX - this.containerOffsetLeft;
  const posChartY = e.pageY;
  const { colors } = this.props.inputData; // eslint-disable-line
  const { xStep, yStep, chartHeight } = this.chartParams;
  const columnIndex = Math.round(posChartX / xStep);
  const { currentColumnValues } = this.state;

  const noteText = [];
  const dotMarks = [];
  Object.entries(currentColumnValues).forEach((col) => {
    const key = col[0];
    const value = col[1];
    if (key === 'x') {
      const dateValue = (() => {
        let dateValueS = new Date(value[columnIndex]).toDateString().split(' ');
        dateValueS.pop();
        dateValueS[0] += ', ';
        dateValueS = dateValueS.join(' ');
        return dateValueS;
      })();
      noteText.push({
        type: 'caption',
        value: dateValue,
        color: '#000000',
      });
    } else {
      const color = colors[key];

      dotMarks.push({
        x: xStep * columnIndex,
        y: chartHeight - yStep * value[columnIndex],
        color,
      });

      noteText.push({
        type: 'infoText',
        value: value[columnIndex],
        color,
      });
    }
  });

  const markLine = {
    x: xStep * columnIndex,
    chartHeight,
  };

  return {
    isShow: true,
    mousePosition: {
      x: columnIndex * xStep,
      y: posChartY,
    },
    noteText,
    dotMarks,
    markLine,
  };
}
