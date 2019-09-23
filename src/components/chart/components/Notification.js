import React, { PureComponent } from 'react';
import getNotificationRenderData from '../logic/getNotificationRenderData';

const InfoBlock = ({ noteText, mousePosition, chartWidth }) => {
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
        const key = `${yTextPos + i * lineHeight + xTextPos}infoBlock`;
        return <text className={`notification-text${classNameCaptopn}`} key={key} x={xTextPos} y={yTextPos + i * lineHeight} style={textStyle}>{t.value}</text>;
      })}
    </React.Fragment>
  );
};

const Marker = ({ dotMarks }) => dotMarks.map((dotMark, i) => {
  const { x, y, color } = dotMark;
  const radius = 4;
  const strokeWidth = 2;
  const key = `${x * y * radius + i}notification-marker`;
  return <circle key={key} className="notification-marker" cx={x} cy={y} r={radius} stroke={color} strokeWidth={strokeWidth} />;
});

const MarkLine = (props) => {
  const { x, y, chartHeight } = props;
  return <line className="notification-markline" x1={x} y1={y} x2={x} y2={y + chartHeight} />;
};

class Notification extends PureComponent{
  constructor(props) {
    super(props);
    this.state = {
      notification: {
        isShow: false,
      },
    };
  }

  componentDidMount() {
    const { svgContainer, enable } = this.props;
    svgContainer.onmousemove = e => (enable && enable.notification ? this.showNotification(e) : null);
    svgContainer.onmouseleave = () => (enable && enable.notification ? this.removeNotification() : null);
  }

  showNotification = (e) => {
    this.setState({
      notification: {
        mousePos: {
          clientX: e.clientX,
          clientY: e.clientY,
        },
        isShow: true,
      },
    });
  };


  removeNotification = () => {
    this.setState({
      notification: {
        isShow: false,
      },
    });
  };

  render() {
    const { currentColumnValues, chartParams, svgContainer, colors } = this.props;
    const { notification } = this.state;
    const { mousePos } = notification;
    const notificationData = getNotificationRenderData(currentColumnValues, chartParams, svgContainer, colors, mousePos);
    if (notification.isShow && notificationData) {
      const {
        noteText, mousePosition, dotMarks, markLine, chartWidth,
      } = notificationData;
      return (
          <>
            <MarkLine {...markLine} />
            <Marker dotMarks={dotMarks} />
            <InfoBlock noteText={noteText} mousePosition={mousePosition} chartWidth={chartWidth} />
          </>
      );
    }
    return null;
  }
}

export default Notification;
