import React, { Component } from 'react';
import getAdditionalChartParams from './getAdditionalChartParams';
import Chart from './Chart';
import ChartAxisX from './ChartAxisX';
import ChartAxisY from './ChartAxisY';
import Notification from './Notification';


class ChartJS extends Component {
  constructor(props) {
    super(props);
    const { containerID } = this.props; // eslint-disable-line

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

    this.state = {
      notification: {
        isShow: false,
        pos: [0, 0],
      },
    };
  }

  componentDidMount() {
  }

  showNotification(e) {
    const posChartX = e.pageX - this.containerOffsetLeft;
    const posChartY = e.pageY;
    console.log(posChartX, posChartY);
    this.setState({
      notification: {
        isShow: true,
        pos: [posChartX, posChartY],
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
    const { columns } = this.props.inputData; // eslint-disable-line
    const { notification } = this.state;

    const chartBgStyle = {
      fill: '#EEEEEE',
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

    const { width, height } = this.chartParams;
    return (
      <React.Fragment>
        <rect width={width} height={height} style={chartBgStyle} onMouseMove={this.showNotification.bind(this)} onMouseLeave={this.removeNotification.bind(this)} />
        <ChartAxisX chartParams={this.chartParams} chartColumnValues={columns.x} styles={chartAxisStyle.textStyle} />
        <ChartAxisY chartParams={this.chartParams} styles={chartAxisStyle} />
        <Chart chartParams={this.chartParams} chartColumnValues={columns.y0} styles={chartLineStyle} />
        <Chart chartParams={this.chartParams} chartColumnValues={columns.y1} styles={chartLineStyle2} />
        {notification.isShow ? <Notification /> : null }
      </React.Fragment>
    );
  }
}


export default ChartJS;
