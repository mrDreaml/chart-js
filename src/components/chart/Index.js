import React, { Component } from 'react';

import Chart from './components/Chart';
import ChartAxisX from './components/ChartAxisX';
import ChartAxisY from './components/ChartAxisY';
import Notification from './components/Notification';
import ChartMap from './components/ChartMap';
import getAdditionalChartParams from './logic/getAdditionalChartParams';
import getNotificationRenderData from './logic/getNotificationRenderData';
import cutColumnValue from './logic/cutColumnValues';

import './styles/style.scss';


class ChartJS extends Component {
  constructor(props) {
    super(props);
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

    this.defaultRange = [0, 90];
    const xAxisHeight = 30;
    const chartMargin = 10;
    const chartParams = {
      containerHeight: this.containerHeight,
      containerWidth: this.containerWidth,
      chartHeight: this.containerHeight - xAxisHeight - chartMargin * 2,
      chartWidth: this.containerWidth - chartMargin * 2,
      chartLeft: chartMargin / 2,
      chartTop: chartMargin / 2,
      xAxisHeight,
      chartRows: 5,
      chartColumns: 6,
    };

    const { columns } = this.props.inputData; // eslint-disable-line
    const currentColumnValues = cutColumnValue(columns, this.defaultRange);
    Object.assign(chartParams, getAdditionalChartParams.call(chartParams, currentColumnValues));

    this.setState({
      isSvgDidMout: true,
      currentColumnValues,
      chartParams,
    });
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }


  updateDimensions() {
    this.componentDidMount();
  }


  chartTransformAnimation(rangeAfter) {
    const { columns } = this.props.inputData; // eslint-disable-line
    const { chartParams } = this.state;
    const rangeAfterValues = cutColumnValue(columns, rangeAfter);
    Object.assign(chartParams, getAdditionalChartParams.call(chartParams, rangeAfterValues));
    this.setState({
      currentColumnValues: rangeAfterValues,
    });
    // const step = 1;
    // const fps = 60;
    // const delay = 1000 / fps;
    // const self = this;
    // let currentRange = range; // eslint-disable-line
    // let timeNow = Date.now();
    // function animationStep() {
    //   if (currentRange[0] !== rangeAfter[0] || currentRange[1] !== rangeAfter[1]) {
    //     window.requestAnimationFrame(animationStep);
    //     if (Date.now() - timeNow >= delay) {
    //       if (currentRange[0] !== rangeAfter[0]) {
    //         currentRange[0] += (currentRange[0] > rangeAfter[0] ? (-step) : step);
    //       }
    //       if (currentRange[1] !== rangeAfter[1]) {
    //         currentRange[1] += (currentRange[1] > rangeAfter[1] ? (-step) : step);
    //       }
    //       const rangeAfterValues = cutColumnValue(columns, currentRange);
    //       Object.assign(chartParams, getAdditionalChartParams.call(chartParams, rangeAfterValues));
    //       self.setState({
    //         currentColumnValues: rangeAfterValues,
    //       });
    //       timeNow = Date.now();
    //     }
    //   } else {
    //     self.setState({
    //       range: currentRange,
    //     });
    //   }
    // }
    // window.requestAnimationFrame(animationStep);
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
    const { inputData } = this.props;
    const {
      notification, isSvgDidMout, currentColumnValues, chartParams,
    } = this.state;
    const { chartSVGProps, chartSVGMapProps } = this.props;

    return (
      <React.Fragment>
        <svg {...chartSVGProps} onMouseMove={this.showNotification} onMouseLeave={this.removeNotification}>
          { isSvgDidMout
            ? (
              <React.Fragment>
                <rect className="chart-background" width={chartParams.containerWidth} height={chartParams.containerHeight} />
                <ChartAxisX chartParams={chartParams} chartColumnValues={currentColumnValues.x} />
                <ChartAxisY chartParams={chartParams} />
                {Object.entries(currentColumnValues).map((col, i) => {
                  const colName = col[0];
                  const colValue = col[1];
                  if (colName !== 'x') {
                    const chartStyle = {
                      stroke: inputData.colors[colName],
                    };
                    const key = colName + colValue[i];
                    return <Chart key={key} chartParams={chartParams} chartColumnValues={colValue} styles={chartStyle} />;
                  }
                  return null;
                })}
                {notification.isShow ? <Notification {...notification} /> : null}
              </React.Fragment>
            )
            : null }
        </svg>
        { isSvgDidMout
          ? (
            <ChartMap range={this.defaultRange} chartSVGMapProps={chartSVGMapProps} inputData={inputData} chartTransformAnimation={this.chartTransformAnimation} />
          ) : null }
      </React.Fragment>
    );
  }
}


export default ChartJS;


// finish map slicer scroll element

// refactor

// set margins at chart 

// map marker fixed to bg

// on/off chart columns

// styling, night theme