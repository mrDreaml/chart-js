import React, { Component } from 'react';
import getAdditionalChartParams from './getAdditionalChartParams';
import Chart from './Chart';
import ChartAxisX from './ChartAxisX';
import ChartAxisY from './ChartAxisY';
import Notification from './Notification';


class ChartJS extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notification: {
        isShow: false,
        pos: [0, 0],
      },
      isSvgDidMout: false,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    const { id: containerID } = this.props.chartSVGProps; // eslint-disable-line
    const chartContainer = document.getElementById(containerID);
    this.containerWidth = chartContainer.clientWidth;
    this.containerHeight = chartContainer.clientHeight;
    this.containerOffsetLeft = chartContainer.getBoundingClientRect().left;

    this.chartParams = {
      height: this.containerHeight,
      width: this.containerWidth,
      chartRows: 5,
      chartColumns: 6,
    };

    const { columns } = this.props.inputData; // eslint-disable-line
    Object.assign(this.chartParams, getAdditionalChartParams.call(this.chartParams, columns));
    this.setState({
      isSvgDidMout: true,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.componentDidMount();
  }


  showNotification(e) {
    const posChartX = e.pageX - this.containerOffsetLeft;
    const posChartY = e.pageY;
    const { columns, colors } = this.props.inputData; // eslint-disable-line
    const { xStep, yStep, height } = this.chartParams;
    const columnIndex = Math.round(posChartX / xStep);

    const noteText = [];
    const dotMarks = [];
    Object.entries(columns).forEach((col) => {
      const key = col[0];
      const value = col[1];
      if (key === 'x') {
        noteText.push({
          type: 'caption',
          value: value[columnIndex],
          color: '#000000',
        });
      } else {
        const color = colors[key];

        dotMarks.push({
          x: xStep * columnIndex,
          y: height - yStep * value[columnIndex],
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
      height,
      style: {
        stroke: '#EEEEEE',
        strokeWidth: 1,
      },
    };

    this.setState({
      notification: {
        isShow: true,
        mousePosition: {
          x: columnIndex * xStep,
          y: posChartY,
        },
        noteText,
        dotMarks,
        markLine,
      },
    });
  }

  removeNotification(e) {
    this.setState({
      notification: {
        isShow: false,
      },
    });
  }

  render() {
    const { columns, colors } = this.props.inputData; // eslint-disable-line
    const { notification, isSvgDidMout } = this.state;
    const { chartSVGProps } = this.props;

    const chartBgStyle = {
      fill: '#FFFFFF',
    };
    const chartLineStyle = {
      stroke: '#FF0000',
      strokeWidth: '2',
    };
    const chartLineStyle2 = {
      stroke: '#0000FF',
      strokeWidth: '2',
    };
    const chartAxisStyle = {
      lineStyle: {
        strokeWidth: '1',
        stroke: '#EEEEEE',
      },
      textStyle: {
        fill: '#CCCCCC',
        fontFamily: '"Segoe UI",Arial, sanserif',
      },
    };

    return (
      <svg {...chartSVGProps} onMouseMove={this.showNotification.bind(this)} onMouseLeave={this.removeNotification.bind(this)}>
        { isSvgDidMout
          ? (
            <React.Fragment>
              <rect width={this.chartParams.width} height={this.chartParams.height} style={chartBgStyle} />
              <ChartAxisX chartParams={this.chartParams} chartColumnValues={columns.x} styles={chartAxisStyle.textStyle} />
              <ChartAxisY chartParams={this.chartParams} styles={chartAxisStyle} />
              {Object.entries(columns).map((col) => {
                const colName = col[0];
                const colValue = col[1];
                if (colName !== 'x') {
                  const styles = {
                    stroke: colors[colName],
                    strokeWidth: '2',
                  };
                  return <Chart chartParams={this.chartParams} chartColumnValues={colValue} styles={styles} />;
                }
                return null;
              })}
              {notification.isShow ? <Notification {...notification} /> : null}
            </React.Fragment>
          )
          : null }
      </svg>
    );
  }
}


export default ChartJS;


// fix y axis value
// REFACTORING MOTHERFUCKER !!!
