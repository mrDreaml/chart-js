export default function getNotificationRenderData(e) {
  const { currentColumnValues, chartParams } = this.state;
  let { chartLeft, chartTop } = chartParams;

  if (chartLeft === undefined) {
    chartLeft = 0;
  }
  if (chartTop === undefined) {
    chartTop = 0;
  }
  window.addEventListener('resize', this.updateDimensions);
  const { id: containerID } = this.props.chartSVGProps; // eslint-disable-line
  const chartContainer = document.getElementById(containerID);
  const posChartY = e.clientY - chartContainer.getBoundingClientRect().y;
  const posChartX = e.clientX - this.containerOffsetLeft - chartLeft;
  const { colors } = this.props.inputData; // eslint-disable-line
  const { xStep, yStep, chartHeight } = chartParams;
  const columnIndex = Math.round(posChartX / xStep);
  if (currentColumnValues.x.length > columnIndex) {
    const noteText = [];
    const dotMarks = [];
    Object.entries(currentColumnValues).forEach((col) => {
      const key = col[0];
      const value = col[1];
      if (value !== null) {
        if (key === 'x') {
          const dateValue = (() => {
            const dateValueS = new Date(value[columnIndex]).toDateString().split(' ');
            return [dateValueS[1], dateValueS[2]].join(', ');
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
        y: posChartY,
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
