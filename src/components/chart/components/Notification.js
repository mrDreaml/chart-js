import React from 'react';

function InfoBlock(props) {
  const { noteText, mousePosition, chartWidth } = props;


  // Default Property
  const lineHeight = 25;
  const margin = 15;
  const paddingLeft = 10;
  const paddingTop = 20;

  // Shape
  const width = paddingLeft + 120;
  const height = paddingTop + noteText.length * lineHeight - 10;
  let xStart = mousePosition.x + margin;
  if (xStart + width >= chartWidth) {
    xStart -= width;
  }
  let yStart = mousePosition.y - margin - height;
  if (yStart - height <= 0) {
    yStart += height * 1.2;
  }

  // Text
  const yTextPos = yStart + paddingTop;
  const xTextPos = xStart + paddingLeft;

  return (
    <React.Fragment>
      <rect className="notification-background" x={xStart} y={yStart} width={width} height={height} />
      {noteText.map((t, i) => {
        let textStyle = {};
        let classNameCaptopn = '';
        if (t.type === 'caption') {
          classNameCaptopn += '-caption';
        } else {
          textStyle = {
            fill: t.color,
          };
        }
        const key = t.value + i * lineHeight;
        return <text className={`notification-text${classNameCaptopn}`} key={key} x={xTextPos} y={yTextPos + i * lineHeight} style={textStyle}>{t.value}</text>;
      })}
    </React.Fragment>
  );
}

const Marker = (props) => {
  const { dotMarks } = props;
  return dotMarks.map((dotMark, i) => {
    const { x, y, color } = dotMark;
    const radius = 4;
    const strokeWidth = 2;
    const key = `${x * y * radius + i}notification-marker`;
    return <circle key={key} className="notification-marker" cx={x} cy={y} r={radius} stroke={color} strokeWidth={strokeWidth} />;
  });
};

const MarkLine = (props) => {
  const { x, y, chartHeight } = props;
  return <line className="notification-markline" x1={x} y1={y} x2={x} y2={y + chartHeight} />;
};

function Notification(props) {
  const {
    noteText, mousePosition, dotMarks, markLine, chartWidth,
  } = props;
  return (
    <React.Fragment>
      <MarkLine {...markLine} />
      <Marker dotMarks={dotMarks} />
      <InfoBlock noteText={noteText} mousePosition={mousePosition} chartWidth={chartWidth} />
    </React.Fragment>
  );
}

export default Notification;
