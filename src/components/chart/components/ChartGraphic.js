import React, { PureComponent } from 'react';
import Chart from './Chart';
import OptionalAxis from './OptionalAxis';
import Notification from './Notification';

import constants from '../../constants/constants';
import getAdditionalChartParams from '../logic/getAdditionalChartParams';
import cutColumnValue from '../logic/cutColumnValues';

import '../styles/style.scss';


class ChartJS extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSvgStretched: false,
    };
    this.svgRef = React.createRef();
  }


  componentDidMount() {
    setTimeout(() => this.setState({
      isSvgStretched: true,
    }), 0);
  }

  calculateParams = () => {
    const {
      inputData, range: propRange, selectedGraphics,
    } = this.props;
    if (this.state.isSvgStretched && inputData !== undefined) {
      const chartContainer = this.svgRef.current;
      const containerWidth = chartContainer.clientWidth || chartContainer.getBoundingClientRect().width;
      const containerHeight = chartContainer.clientHeight || chartContainer.getBoundingClientRect().height;
      const {
        xAxisHeight, chartMargin, chartMarginMulti, chartColumns, chartRows, colNameX,
      } = constants;
      const { columns } = inputData;
      const chartColumnsShow = Object.keys(columns).reduce((acc, v) => {
        if (v !== colNameX) {
          acc[v] = selectedGraphics[v];
        }
        return acc;
      }, {});
      const currentColumnValues = cutColumnValue(columns, propRange, chartColumnsShow);
      const chartParams = {
        containerHeight,
        containerWidth,
        chartHeight: containerHeight - chartMargin * chartMarginMulti - xAxisHeight,
        chartWidth: containerWidth - chartMargin * chartMarginMulti,
        chartLeft: chartMargin / chartMarginMulti,
        chartTop: chartMargin / chartMarginMulti,
        xAxisHeight,
        chartRows,
        chartColumns,
        range: propRange,
        containerOffsetLeft: this.svgRef.current.getBoundingClientRect().left,
      };

      return {
        currentColumnValues,
        chartParams: { ...chartParams, ...getAdditionalChartParams(chartParams, currentColumnValues) },
        chartColumnsShow,
      };
    }
    return {};
  };

  render() {
    const { inputData, enable, theme, width } = this.props;
    const { isSvgStretched } = this.state;
    const { chartColumnsShow, chartParams, currentColumnValues } = this.calculateParams();
    const { colors } = inputData;
    const notificationProps = {
      currentColumnValues, chartParams, svgContainer: this.svgRef.current, colors,
    };
    return (
      <>
        <svg
          className={`${constants.graphicClassName}--${theme}`}
          ref={this.svgRef}
        >
          {isSvgStretched ? (
            <>
              <rect
                className={constants.styleNames.svgRect}
                width={constants.fullSizeStyle}
                height={constants.fullSizeStyle}
              />
              <OptionalAxis {...{
                enable, chartParams, inputData, width,
              }}
              />
              <Chart {...{chartColumnsShow, currentColumnValues, colors, chartParams }} width={width} />
              <Notification {...notificationProps} enable={enable} />
            </>
          ) : null}
        </svg>
      </>
    );
  }
}

export default ChartJS;
