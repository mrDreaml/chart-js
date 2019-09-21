import React, { PureComponent } from 'react';
import Chart from './Chart';
import ChartAxisX from './ChartAxisX';
import ChartAxisY from './ChartAxisY';
import Notification from './Notification';

import constants from '../../constants/constants';
import getNotificationRenderData from '../logic/getNotificationRenderData';
import getAdditionalChartParams from '../logic/getAdditionalChartParams';
import cutColumnValue from '../logic/cutColumnValues';

import '../styles/style.scss';

class ChartJS extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSvgStretched: false,
      notification: {
        isShow: false,
      },

    };
    this.svgRef = React.createRef();
  }


  componentDidMount() {
    const { inputData } = this.props;
    if (inputData !== undefined) {
      window.addEventListener('resize', this.updateDimensions);
      const chartContainer = this.svgRef.current;
      const containerWidth = chartContainer.clientWidth || chartContainer.getBoundingClientRect().width;
      const containerHeight = chartContainer.clientHeight || chartContainer.getBoundingClientRect().height;
      const {
        xAxisHeight, chartMargin, chartMarginMulti, chartColumns, chartRows, range, colNameX,
      } = constants;
      const { columns } = inputData;
      const chartColumnsShow = Object.keys(columns).reduce((acc, v) => {
        if (v !== colNameX) {
          acc[v] = true;
        }
        return acc;
      }, {});
      const currentColumnValues = cutColumnValue(columns, range);
      const chartParams = {
        containerHeight,
        containerWidth,
        chartHeight: containerHeight - xAxisHeight - chartMargin * chartMarginMulti,
        chartWidth: containerWidth - chartMargin * chartMarginMulti,
        chartLeft: chartMargin / chartMarginMulti,
        chartTop: chartMargin / chartMarginMulti,
        xAxisHeight,
        chartRows,
        chartColumns,
        range,
      };

      setTimeout(() => this.setState({
        currentColumnValues,
        chartParams: { ...chartParams, ...getAdditionalChartParams(chartParams, currentColumnValues) },
        chartColumnsShow,
        isSvgStretched: true,
      }), 0);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }


  updateDimensions = () => {
    this.componentDidMount();
  }

  showNotification = (e) => {
    const { svgRef } = this;
    const { currentColumnValues, chartParams } = this.state;
    const { colors } = this.props.inputData;
    this.setState({
      notification: getNotificationRenderData(currentColumnValues, chartParams, svgRef.current, colors, e),
    });
  }


  removeNotification = () => {
    this.setState({
      notification: {
        isShow: false,
      },
    });
  }

  render() {
    const { inputData, enable, mapClassStyle } = this.props;
    const {
      isSvgStretched,
      currentColumnValues,
      chartParams,
      chartColumnsShow,
      notification,
    } = this.state;


    return (
      <>
        <svg
          className={`${mapClassStyle ? constants.graphicMapClassName : constants.graphicClassName}--${this.props.theme}`}
          onMouseMove={e => (enable && enable.notification ? this.showNotification(e) : null)}
          onMouseLeave={() => (enable && enable.notification ? this.removeNotification() : null)}
          ref={this.svgRef}
        >
          {isSvgStretched ? (
            <>
              <rect
                className={constants.styleNames.svgRect}
                width={constants.fullSizeStyle}
                height={constants.fullSizeStyle}
              />
              { enable && enable.axisX ? (
                <ChartAxisX chartParams={chartParams} chartColumnValues={inputData.columns.x} />
              ) : null }
              { enable && enable.axisY ? (
                <ChartAxisY chartParams={chartParams} globalYmaxValue={chartParams.yMaxValue} />
              ) : null}
              {Object.values(chartColumnsShow).includes(true)
                ? (
                  <>
                    {Object.entries(currentColumnValues).map((col, i) => {
                      const [colName, colValue] = col;
                      if (colValue !== null && colName !== constants.colNameX) {
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
                  </>
                )
                : null}
              {notification.isShow ? <Notification {...notification} /> : null}
            </>
          ) : null}
        </svg>
      </>
    );
  }
}

export default ChartJS;
