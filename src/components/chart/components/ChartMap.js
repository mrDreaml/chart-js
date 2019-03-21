import React, { Component } from 'react';

import Chart from './Chart';
import RangeNotSelected from './RangeNotSelected';
import MoveElement from './MoveElement';
import getAdditionalChartParams from '../logic/getAdditionalChartParams';


class CharMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSvgMapDidMout: false,
    };

    this.mapDragElement = null;
    this.updateDimensions = this.updateDimensions.bind(this);
    this.rangeDragEvent = this.rangeDragEvent.bind(this);
    this.dragAnimation = this.dragAnimation.bind(this);
  }


  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);

    const { id } = this.props.chartSVGMapProps; // eslint-disable-line
    this.chartContainerMap = document.getElementById(id);
    this.containerMapWidth = this.chartContainerMap.clientWidth;
    this.containerMapHeight = this.chartContainerMap.clientHeight;
    this.containerOffsetLeft = this.chartContainerMap.getBoundingClientRect().left;

    this.chartParamsMap = {
      chartHeight: this.containerMapHeight,
      chartWidth: this.containerMapWidth,
    };

    const { columns } = this.props.inputData; // eslint-disable-line
    Object.assign(this.chartParamsMap, getAdditionalChartParams.call(this.chartParamsMap, columns));

    const { range } = this.props;
    this.setState({
      isSvgMapDidMout: true,
      range,
    });
  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }


  updateDimensions() {
    this.componentDidMount();
  }

  dragAnimation(e) {
    const posMapX = e.clientX - this.containerOffsetLeft;
    const { xStep } = this.chartParamsMap;
    const columnIndex = Math.round(posMapX / xStep);
    const { range: rangeBefore } = this.state;
    const rangeAfter = Object.values(Object.assign({}, rangeBefore));
    if (this.mapDragElement.type === 'single') {
      rangeAfter[this.mapDragElement.value] = columnIndex;
    } else {
      const selectedWidth = rangeBefore[1] - rangeBefore[0];
      rangeAfter[0] = columnIndex - this.mapDragElement.selectedMouseMargin;
      rangeAfter[1] = columnIndex + selectedWidth - this.mapDragElement.selectedMouseMargin;
    }
    const { inputData } = this.props;
    const itemsQuantity = inputData.columns.x.length;
    if (rangeAfter[1] - rangeAfter[0] > 1) {
      if (rangeAfter[0] < 0) {
        rangeAfter[0] = 0;
        rangeAfter[1] = rangeBefore[1];
      }
      if (rangeAfter[1] > itemsQuantity - 1) {
        rangeAfter[1] = itemsQuantity - 1;
        rangeAfter[0] = rangeBefore[0];
      }
      this.props.chartTransformAnimation(rangeAfter); // eslint-disable-line
      this.setState({
        range: rangeAfter,
      });
    }
  }

  rangeDragEvent(e, checkedDragElement) {
    if (checkedDragElement !== undefined) {
      if (checkedDragElement instanceof Array) {
        this.mapDragElement = {
          type: 'scroll',
        };
        const posMapX = e.clientX - this.containerOffsetLeft;
        const { xStep } = this.chartParamsMap;
        const columnIndex = Math.round(posMapX / xStep);
        const { range: rangeBefore } = this.state;
        this.mapDragElement.selectedMouseMargin = columnIndex - rangeBefore[0];
      } else {
        this.mapDragElement = {
          type: 'single',
          value: checkedDragElement,
        };
      }
      this.chartContainerMap.addEventListener('mousemove', this.dragAnimation, false);
    } else if (this.mapDragElement !== null) {
      this.chartContainerMap.removeEventListener('mousemove', this.dragAnimation, false);
      this.mapDragElement = null;
    }
  }

  render() {
    const { inputData } = this.props;
    const {
      isSvgMapDidMout, range,
    } = this.state;
    const { chartSVGMapProps } = this.props; // eslint-disable-line
    const { chartParamsMap } = this;

    return (
      <svg className={this.containerClassName} {...chartSVGMapProps}>
        { isSvgMapDidMout
          ? (
            <React.Fragment>
              <rect onMouseUp={this.rangeDragEvent} className="chart-background-map" width={chartParamsMap.chartWidth} height={chartParamsMap.chartHeight} />
              {Object.entries(inputData.columns).map((col, i) => {
                const colName = col[0];
                const colValue = col[1];
                if (colName !== 'x') {
                  const chartStyle = {
                    stroke: inputData.colors[colName],
                  };
                  const key = `${colName + colValue[i]}map`;
                  return <Chart key={key} chartParams={chartParamsMap} chartColumnValues={colValue} styles={chartStyle} />;
                }
                return null;
              })}
              <RangeNotSelected chartParamsMap={chartParamsMap} range={range} callbackEvent={this.rangeDragEvent} />
              <MoveElement chartParamsMap={chartParamsMap} range={range} callbackEvent={this.rangeDragEvent} />
            </React.Fragment>
          ) : null}
      </svg>
    );
  }
}


export default CharMap;