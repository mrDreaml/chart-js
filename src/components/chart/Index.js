import React, { Component } from 'react';
import getAdditionalChartParams from './logic/getAdditionalChartParams';
import Chart from './components/Chart';
import ChartAxisX from './components/ChartAxisX';
import ChartAxisY from './components/ChartAxisY';
import Notification from './components/Notification';
import getNotificationRenderData from './logic/getNotificationRenderData';

import './styles/style.scss';


class ChartJS extends Component {
  constructor(props) {
    super(props);
    this.containerClassName = 'ChartJS';

    this.state = {
      notification: {
        isShow: false,
      },
      isSvgDidMout: false,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    const { id: containerID } = this.props.chartSVGProps; // eslint-disable-line
    const chartContainer = document.getElementById(containerID);
    this.containerWidth = chartContainer.clientWidth;
    this.containerHeight = chartContainer.clientHeight;
    this.containerOffsetLeft = chartContainer.getBoundingClientRect().left;

    const xAxisHeight = 30;
    this.chartParams = {
      containerHeight: this.containerHeight,
      containerWidth: this.containerWidth,
      chartHeight: this.containerHeight - xAxisHeight,
      chartWidth: this.containerWidth,
      xAxisHeight,
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
    this.setState({
      notification: getNotificationRenderData.call(this, e),
    });
  }

  removeNotification() {
    this.setState({
      notification: {
        isShow: false,
      },
    });
  }

  render() {
    const { columns, colors } = this.props.inputData; // eslint-disable-line
    const { notification, isSvgDidMout } = this.state;
    const { chartSVGProps } = this.props; // eslint-disable-line

    return (
      <svg className={this.containerClassName} {...chartSVGProps} onMouseMove={this.showNotification} onMouseLeave={this.removeNotification}>
        { isSvgDidMout
          ? (
            <React.Fragment>
              <rect className="chart-background" width={this.chartParams.containerWidth} height={this.chartParams.containerHeight} />
              <ChartAxisX chartParams={this.chartParams} chartColumnValues={columns.x} />
              <ChartAxisY chartParams={this.chartParams} />
              {Object.entries(columns).map((col) => {
                const colName = col[0];
                const colValue = col[1];
                if (colName !== 'x') {
                  const chartStyle = {
                    stroke: colors[colName],
                  };
                  return <Chart chartParams={this.chartParams} chartColumnValues={colValue} styles={chartStyle} />;
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
