import React from 'react';

function InfoBlock(props) {
  const { noteText, mousePosition } = props;

  // Default Property
  const lineHeight = 25;
  const margin = 15;
  const paddingLeft = 10;
  const paddingTop = 20;

  // Shape
  const width = paddingLeft + 120;
  const height = paddingTop + noteText.length * lineHeight - 10;
  const xStart = mousePosition.x + margin;
  const yStart = mousePosition.y - margin - height;

  // Text
  const yTextPos = yStart + paddingTop;
  const xTextPos = xStart + paddingLeft;

  return (
    <React.Fragment>
      <rect x={xStart} y={yStart} width={width} height={height} style={{ fill: '#EEEEEE' }} />
      {noteText.map((t, i) => {
        const textStyle = {
          fill: t.color,
        };
        if (t.type === 'caption') {
          textStyle.fontWeight = 'bold';
        }
        const key = t.value + i * lineHeight;
        return <text key={key} x={xTextPos} y={yTextPos + i * lineHeight} style={textStyle}>{t.value}</text>;
      })}
    </React.Fragment>
  );
}

const Marker = (props) => {
  const { dotMarks } = props;
  return dotMarks.map((dotMark) => {
    const { x, y, color } = dotMark;
    const radius = 4;
    const strokeWidth = 2;
    return <circle cx={x} cy={y} r={radius} stroke={color} strokeWidth={strokeWidth} fill="#FFFFFF" />;
  });
};

const MarkLine = (props) => {
  const { x, height, style } = props;
  return <line x1={x} y1={0} x2={x} y2={height} style={style} />;
};

function Notification(props) {
  const {
    noteText, mousePosition, dotMarks, markLine,
  } = props;
  return (
    <React.Fragment>
      <MarkLine {...markLine} />
      <InfoBlock noteText={noteText} mousePosition={mousePosition} />
      <Marker dotMarks={dotMarks} />
    </React.Fragment>
  );
}

export default Notification;
