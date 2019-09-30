import React, { PureComponent } from 'react';
import Chart from './Chart';

import constants from '../../constants/constants';
import getAdditionalChartParams from '../logic/getAdditionalChartParams';

import '../styles/style.scss';
import Focus from './Focus';


class ChartGraphicMap extends PureComponent {
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
    const { inputData } = this.props;
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
          acc[v] = true;
        }
        return acc;
      }, {});
      const chartParams = {
        containerHeight,
        containerWidth,
        chartHeight: containerHeight,
        chartWidth: containerWidth - chartMargin * chartMarginMulti,
        chartLeft: chartMargin / chartMarginMulti,
        chartTop: chartMargin / chartMarginMulti,
        xAxisHeight,
        chartRows,
        chartColumns,
        containerOffsetLeft: this.svgRef.current.getBoundingClientRect().left,
      };
      return {
        currentColumnValues: columns,
        chartParams: { ...chartParams, ...getAdditionalChartParams(chartParams, columns) },
        chartColumnsShow,
      };
    }
    return {};
  };

  render() {
    const { isSvgStretched } = this.state;
    const { inputData, updateRange, theme, width } = this.props;
    const { chartColumnsShow, chartParams, currentColumnValues } = this.calculateParams();
    return (
      <>
        <svg
          className={`${constants.graphicMapClassName}--${theme}`}
          ref={this.svgRef}
        >
          {isSvgStretched ? (
            <>
              <rect
                className={constants.styleNames.svgRect}
                width={constants.fullSizeStyle}
                height={constants.fullSizeStyle}
              />
              <Chart {...{chartColumnsShow, currentColumnValues, colors: inputData.colors, chartParams, width }} />
              <Focus chartParams={chartParams} inputData={inputData} updateRange={updateRange} range={[0, 90]} container={this.svgRef.current} width={width} />
            </>
          ) : null}
        </svg>
      </>
    );
  }
}

export default ChartGraphicMap;
