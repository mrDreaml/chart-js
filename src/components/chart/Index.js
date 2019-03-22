import React, { Component, Fragment } from 'react';

import Chart from './components/Chart';
import ChartAxisX from './components/ChartAxisX';
import ChartAxisY from './components/ChartAxisY';
import Notification from './components/Notification';
import ChartMap from './components/ChartMap';
import ChartSelector from './components/ChartSelector';

import getAdditionalChartParams from './logic/getAdditionalChartParams';
import getNotificationRenderData from './logic/getNotificationRenderData';
import cutColumnValue from './logic/cutColumnValues';
import chartSelectAnimation from './logic/chartSelectAnimation';

import './styles/style.scss';

class ChartJS extends Component {
  constructor(props) {
    super(props);
    const { theme } = this.props;
    this.state = {
      notification: {
        isShow: false,
      },
      isSvgDidMout: false,
      theme,
    };

    this.chartSVGMapClassName = props.chartSVGMapProps.className;
    this.chartSVGClassName = props.chartSVGProps.className;
    delete props.chartSVGMapProps.className;
    delete props.chartSVGProps.className;

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showNotification = this.showNotification.bind(this);
    this.removeNotification = this.removeNotification.bind(this);
    this.chartChangeRange = this.chartChangeRange.bind(this);
    this.chartSelect = this.chartSelect.bind(this);
  }


  componentDidMount() {
    const { inputData } = this.props;
    if (inputData !== undefined) {
      window.addEventListener('resize', this.updateDimensions);
      const { id: containerID } = this.props.chartSVGProps; // eslint-disable-line
      const chartContainer = document.getElementById(containerID);
      this.containerWidth = chartContainer.clientWidth || chartContainer.getBoundingClientRect().width;
      this.containerHeight = chartContainer.clientHeight || chartContainer.getBoundingClientRect().height;
      this.containerOffsetLeft = chartContainer.getBoundingClientRect().left;
      this.Range = [0, 90];

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

      const { columns } = inputData; // eslint-disable-line
      const chartColumnsShow = {};
      Object.keys(columns).forEach((columnKey) => {
        if (columnKey !== 'x') {
          chartColumnsShow[columnKey] = true;
        }
      });
      const currentColumnValues = cutColumnValue(columns, this.Range);
      Object.assign(
        chartParams,
        getAdditionalChartParams.call(chartParams, currentColumnValues),
      );

      this.setState({
        isSvgDidMout: true,
        currentColumnValues,
        chartParams,
        chartColumnsShow,
      });
    }
  }

  componentWillReceiveProps(props) {
    const { theme } = props;
    delete props.chartSVGMapProps.className;
    delete props.chartSVGProps.className;
    this.setState({
      theme,
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }


  updateDimensions() {
    this.componentDidMount();
  }


  chartChangeRange(rangeAfter) {
    this.Range = rangeAfter;
    const { columns } = this.props.inputData; // eslint-disable-line
    const { chartParams, chartColumnsShow } = this.state;
    const rangeAfterValues = cutColumnValue(columns, rangeAfter);
    Object.entries(chartColumnsShow).forEach((col) => {
      const key = col[0];
      const value = col[1];
      if (!value) {
        rangeAfterValues[key] = null;
      }
    });
    Object.assign(
      chartParams,
      getAdditionalChartParams.call(chartParams, rangeAfterValues),
    );
    this.setState({
      currentColumnValues: rangeAfterValues,
    });
  }


  chartSelect(selectName) {
    const { inputData } = this.props;
    chartSelectAnimation.call(this, inputData, selectName);
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
      notification,
      isSvgDidMout,
      currentColumnValues,
      chartParams,
      chartColumnsShow,
      theme,
    } = this.state;
    const { chartSVGProps, chartSVGMapProps } = this.props;


    return (
      <Fragment>
        <svg
          {...chartSVGProps}
          className={`${this.chartSVGClassName}--${theme}`}
          onMouseMove={this.showNotification}
          onMouseLeave={this.removeNotification}
        >
          {isSvgDidMout ? (
            <Fragment>
              <rect
                className="chart-background"
                width={chartParams.containerWidth}
                height={chartParams.containerHeight}
              />
              <ChartAxisX
                chartParams={chartParams}
                chartColumnValues={currentColumnValues.x}
              />
              { Object.values(chartColumnsShow).includes(true)
                ? (
                  <Fragment>
                    <ChartAxisY chartParams={chartParams} />
                    {Object.entries(currentColumnValues).map((col, i) => {
                      const colName = col[0];
                      const colValue = col[1];
                      if (colValue !== null && colName !== 'x') {
                        const chartStyle = {
                          stroke: inputData.colors[colName],
                        };
                        const key = colName + colValue[i];
                        return (
                          <Chart
                            key={key}
                            chartParams={chartParams}
                            chartColumnValues={colValue}
                            styles={chartStyle}
                          />
                        );
                      }
                      return null;
                    })}
                    {notification.isShow ? <Notification {...notification} /> : null}
                  </Fragment>
                )
                : null}
            </Fragment>
          ) : null}
        </svg>
        {isSvgDidMout ? (
          <Fragment>
            <ChartMap
              range={this.Range}
              chartSVGMapProps={chartSVGMapProps}
              className={`${this.chartSVGMapClassName}--${theme}`}
              inputData={inputData}
              callbackChartChangeRange={this.chartChangeRange}
            />
            <ChartSelector inputData={inputData} chartSelect={chartColumnsShow} theme={theme} callback={this.chartSelect} />
          </Fragment>
        ) : null}
      </Fragment>
    );
  }
}

export default ChartJS;
