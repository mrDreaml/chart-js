export default function getNotificationRenderData(currentColumnValues, chartParams, chartContainer, colors, mousePos) {
  if (!mousePos) {
    return;
  }
  let { chartLeft, chartTop } = chartParams;
  const { xStep, yStep, chartHeight, chartWidth } = chartParams;

  if (chartLeft === undefined) {
    chartLeft = 0;
  }
  if (chartTop === undefined) {
    chartTop = 0;
  }
  const posChartY = mousePos.clientY - chartContainer.getBoundingClientRect().y;
  const containerOffsetLeft = chartContainer.getBoundingClientRect().left;
  const posChartX = mousePos.clientX - containerOffsetLeft - chartLeft;
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
      mousePosition: {
        x: chartLeft + columnIndex * xStep,
        y: posChartY,
      },
      chartWidth,
      noteText,
      dotMarks,
      markLine,
    };
  }
  return;
}
