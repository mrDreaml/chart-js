import React, { Component } from 'react';

import Chart from './components/Chart';
import ChartAxisX from './components/ChartAxisX';
import ChartAxisY from './components/ChartAxisY';
import Notification from './components/Notification';

import getAdditionalChartParams from './logic/getAdditionalChartParams';
import getNotificationRenderData from './logic/getNotificationRenderData';
import cutColumnValue from './logic/cutColumnValues';

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
    this.chartTransformAnimation = this.chartTransformAnimation.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    const { id: containerID } = this.props.chartSVGProps; // eslint-disable-line
    const chartContainer = document.getElementById(containerID);
    this.containerWidth = chartContainer.clientWidth;
    this.containerHeight = chartContainer.clientHeight;
    this.containerOffsetLeft = chartContainer.getBoundingClientRect().left;

    const xAxisHeight = 30;
    const chartParams = {
      containerHeight: this.containerHeight,
      containerWidth: this.containerWidth,
      chartHeight: this.containerHeight - xAxisHeight,
      chartWidth: this.containerWidth,
      xAxisHeight,
      chartRows: 5,
      chartColumns: 6,
    };

    const defaultRange = [0, 112];

    const { columns } = this.props.inputData; // eslint-disable-line
    const currentColumnValues = cutColumnValue(columns, defaultRange);
    Object.assign(chartParams, getAdditionalChartParams.call(chartParams, currentColumnValues));
    this.setState({
      isSvgDidMout: true,
      currentColumnValues,
      chartParams,
      range: defaultRange,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    this.componentDidMount();
  }

  chartTransformAnimation() {
    const { columns } = this.props.inputData; // eslint-disable-line
    const { range, chartParams } = this.state;
    const step = 1;
    const fps = 400;
    const delay = 1000 / fps;
    const self = this;
    let currentRange = range; // eslint-disable-line
    const rangeAfter = [10, 20];
    let timeNow = Date.now();
    function animationStep() {
      if (currentRange[0] !== rangeAfter[0] || currentRange[1] !== rangeAfter[1]) {
        window.requestAnimationFrame(animationStep);
        if (Date.now() - timeNow >= delay) {
          if (currentRange[0] !== rangeAfter[0]) {
            currentRange[0] += (currentRange[0] > rangeAfter[0] ? (-step) : step);
          }
          if (currentRange[1] !== rangeAfter[1]) {
            currentRange[1] += (currentRange[1] > rangeAfter[1] ? (-step) : step);
          }
          const rangeAfterValues = cutColumnValue(columns, currentRange);
          Object.assign(chartParams, getAdditionalChartParams.call(chartParams, rangeAfterValues));
          self.setState({
            currentColumnValues: rangeAfterValues,
          });
          timeNow = Date.now();
        }
      } else {
        self.setState({
          range: currentRange,
        });
      }
    }

    window.requestAnimationFrame(animationStep);
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
    const { colors } = this.props.inputData; // eslint-disable-line
    const {
      notification, isSvgDidMout, currentColumnValues, chartParams,
    } = this.state;
    const { chartSVGProps } = this.props; // eslint-disable-line

    return (
      <React.Fragment>
        <svg className={this.containerClassName} {...chartSVGProps} onMouseMove={this.showNotification} onMouseLeave={this.removeNotification}>
          { isSvgDidMout
            ? (
              <React.Fragment>
                <rect className="chart-background" width={chartParams.containerWidth} height={chartParams.containerHeight} />
                <ChartAxisX chartParams={chartParams} chartColumnValues={currentColumnValues.x} />
                <ChartAxisY chartParams={chartParams} />
                {Object.entries(currentColumnValues).map((col) => {
                  const colName = col[0];
                  const colValue = col[1];
                  if (colName !== 'x') {
                    const chartStyle = {
                      stroke: colors[colName],
                    };
                    return <Chart chartParams={chartParams} chartColumnValues={colValue} styles={chartStyle} />;
                  }
                  return null;
                })}
                {notification.isShow ? <Notification {...notification} /> : null}
              </React.Fragment>
            )
            : null }
        </svg>
        <button onClick={this.chartTransformAnimation}>Zoom</button>
      </React.Fragment>
    );
  }
}


export default ChartJS;
