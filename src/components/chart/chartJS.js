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
    // console.log(posChartX, posChartY);
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
    const { notification, isSvgDidMout } = this.state;

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

    const { chartSVGProps } = this.props;

    return (
      <svg {...chartSVGProps} onMouseMove={this.showNotification.bind(this)} onMouseLeave={this.removeNotification.bind(this)}>
        { isSvgDidMout
          ? (
            <React.Fragment>
              <rect width={this.chartParams.width} height={this.chartParams.height} style={chartBgStyle} />
              <ChartAxisX chartParams={this.chartParams} chartColumnValues={columns.x} styles={chartAxisStyle.textStyle} />
              <ChartAxisY chartParams={this.chartParams} styles={chartAxisStyle} />
              <Chart chartParams={this.chartParams} chartColumnValues={columns.y0} styles={chartLineStyle} />
              <Chart chartParams={this.chartParams} chartColumnValues={columns.y1} styles={chartLineStyle2} />
              {notification.isShow ? <Notification /> : null }
            </React.Fragment>
          )
          : null }
      </svg>
    );
  }
}


export default ChartJS;

// svg => shold be there
