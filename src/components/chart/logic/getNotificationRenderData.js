export default function getNotificationRenderData(e) {
  const { currentColumnValues, chartParams } = this.state;
  let { chartLeft, chartTop } = chartParams;

  if (chartLeft === undefined) {
    chartLeft = 0;
  }
  if (chartTop === undefined) {
    chartTop = 0;
  }
  const posChartX = e.pageX - this.containerOffsetLeft - chartLeft;
  const posChartY = e.pageY;
  const { colors } = this.props.inputData; // eslint-disable-line
  const { xStep, yStep, chartHeight } = chartParams;
  const columnIndex = Math.round(posChartX / xStep);
  if (currentColumnValues.x.length > columnIndex) {
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
          x: chartLeft + xStep * columnIndex,
          y: chartTop + chartHeight - yStep * value[columnIndex],
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
      x: chartLeft + xStep * columnIndex,
      y: chartTop,
      chartHeight,
    };

    return {
      isShow: true,
      mousePosition: {
        x: chartLeft + columnIndex * xStep,
        y: chartTop + posChartY,
      },
      noteText,
      dotMarks,
      markLine,
    };
  }
  return {
    isShow: false,
  };
}
