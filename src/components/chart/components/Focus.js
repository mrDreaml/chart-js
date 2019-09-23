import React, { PureComponent } from 'react';
import { throttle } from 'throttle-debounce';
import constants from '../../constants/constants';

class Focus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      range: props.range,
    };
    this.mapDragElement = null;
  }

  dragAnimation = (e) => {
    if (this.mapDragElement) {
      let posMapX;
      const { START, END } = constants.rangeValues;
      const { containerOffsetLeft, xStep } = this.props.chartParams;
      const rangeBefore = this.state.range;
      if (e.type === 'touchmove') {
        posMapX = e.touches[0].clientX - containerOffsetLeft;
      } else if (e.type === 'mousemove') {
        posMapX = e.clientX - containerOffsetLeft;
      }
      const columnIndex = Math.round(posMapX / xStep);
      const rangeAfter = [...rangeBefore];
      if (this.mapDragElement.type === 'single') {
        rangeAfter[this.mapDragElement.value] = columnIndex;
      } else {
        const selectedWidth = rangeBefore[END] - rangeBefore[START];
        rangeAfter[START] = columnIndex - this.mapDragElement.selectedMouseMargin;
        rangeAfter[END] = rangeAfter[START] + selectedWidth;
      }
      const { inputData } = this.props;
      const itemsQuantity = inputData.columns.x.length;
      const minFlipSize = 20;
      if (rangeAfter[END] - rangeAfter[START] > minFlipSize) {
        if (rangeAfter[START] < 0) {
          rangeAfter[START] = 0;
          rangeAfter[END] = rangeBefore[END];
        }
        if (rangeAfter[END] > itemsQuantity) {
          rangeAfter[END] = itemsQuantity;
          rangeAfter[START] = rangeBefore[START];
        }
        this.setState({
          range: rangeAfter,
        });
        throttle(200, () => this.props.updateRange(rangeAfter))();
      }
    }
  };

  rangeDragEvent = (e, checkedDragElement) => {
    const dragAnimationThrottle = throttle(50, this.dragAnimation);
    const { container } = this.props;
    if (checkedDragElement !== undefined) {
      if (checkedDragElement instanceof Array) {
        this.mapDragElement = {
          type: 'scroll',
        };
        let posMapX;
        const { containerOffsetLeft, xStep } = this.props.chartParams;
        const rangeBefore = this.state.range;
        if (e.type === 'touchstart') {
          posMapX = e.touches[0].clientX - containerOffsetLeft;
        } else if (e.type === 'mousedown') {
          posMapX = e.clientX - containerOffsetLeft;
        }
        const columnIndex = Math.round(posMapX / xStep);
        this.mapDragElement.selectedMouseMargin = columnIndex - rangeBefore[0];
      } else {
        this.mapDragElement = {
          type: 'single',
          value: checkedDragElement,
        };
      }
      container.addEventListener('mousemove', dragAnimationThrottle, false);
      container.addEventListener('touchmove', dragAnimationThrottle, false);
    } else if (this.mapDragElement !== null) {
      container.removeEventListener('mousemove', dragAnimationThrottle, false);
      container.removeEventListener('touchmove', dragAnimationThrottle, false);
      this.mapDragElement = null;
    }
  };

  render() {
    const { chartParams } = this.props;
    const { xStep, chartWidth } = chartParams;
    const { range } = this.state;
    const borderWidth = 20;
    const height = chartParams.chartHeight;
    const leftWidth = range[0] * xStep;
    const selectedWidth = (range[1] - range[0]) * xStep;
    const rightWidth = leftWidth + selectedWidth - borderWidth;
    const notSelectedRightWidth = chartWidth - leftWidth - selectedWidth;
    const callbackEvent = this.rangeDragEvent;
    return (
      <>
        <rect onMouseDown={e => callbackEvent(e, 0)} onTouchStart={e => callbackEvent(e, 0)} onMouseUp={callbackEvent} onTouchEnd={callbackEvent} className="focus-move-element" height={height} width={borderWidth} x={leftWidth} />
        <rect onMouseDown={e => callbackEvent(e, [0, 1])} onTouchStart={e => callbackEvent(e, [0, 1])} onMouseUp={callbackEvent} onTouchEnd={callbackEvent} className="focus-move-element-scroll" height={height} width={selectedWidth - borderWidth - borderWidth} x={leftWidth + borderWidth} />
        <rect onMouseDown={e => callbackEvent(e, 1)} onTouchStart={e => callbackEvent(e, 1)} onMouseUp={callbackEvent} onTouchEnd={callbackEvent} className="focus-move-element" height={height} width={borderWidth} x={rightWidth} />
        <rect onMouseUp={callbackEvent} className="not-selected-bg-map" height={height} width={leftWidth} x={0} />
        <rect onMouseUp={callbackEvent} className="not-selected-bg-map" height={height} width={notSelectedRightWidth >= 0 ? notSelectedRightWidth + borderWidth : 0} x={chartWidth - notSelectedRightWidth} />
      </>
    );
  }
}

export default Focus;
