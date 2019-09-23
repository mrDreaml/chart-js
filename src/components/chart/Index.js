// import React, { Component, Fragment } from 'react';
// import uuid from 'uuid/v1';
//
// import Chart from './components/Chart';
// import ChartAxisX from './components/ChartAxisX';
// import ChartAxisY from './components/ChartAxisY';
// import Notification from './components/Notification';
// import ChartMap from './components/ChartMap';
// import ChartSelector from './components/ChartSelector';
//
// import getAdditionalChartParams from './logic/getAdditionalChartParams';
// import getNotificationRenderData from './logic/getNotificationRenderData';
// import cutColumnValue from './logic/cutColumnValues';
// import chartSelectAnimation from './logic/chartSelectAnimation';
//
// import './styles/style.scss';
//
// const SVG_CLASS_NAME = 'ChartJS';
// // const chartSVGProps = {
// //   className: 'ChartJS',
// //   height: '500px',
// //   width: '100%',
// //   position: 'relative',
// // };
//
// // const chartSVGMapProps = {
// //   className: 'ChartJS-map',
// //   height: '100px',
// //   width: '100%',
// //   position: 'relative',
// // };
//
// class ChartJS extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       notification: {
//         isShow: false,
//       },
//       isSvgStretched: false,
//     };
//     this.svgRef = React.createRef();
//   }
//
//
//   componentDidMount() {
//     const { inputData } = this.props;
//     if (inputData !== undefined) {
//       window.addEventListener('resize', this.updateDimensions);
//       const chartContainer = this.svgRef.current;
//       this.containerWidth = chartContainer.clientWidth || chartContainer.getBoundingClientRect().width;
//       this.containerHeight = chartContainer.clientHeight || chartContainer.getBoundingClientRect().height;
//
//       this.containerOffsetLeft = chartContainer.getBoundingClientRect().left;
//
//       const xAxisHeight = 30;
//       const chartMargin = 10;
//       const chartParams = {
//         containerHeight: this.containerHeight,
//         containerWidth: this.containerWidth,
//         chartHeight: this.containerHeight - xAxisHeight - chartMargin * 2,
//         chartWidth: this.containerWidth - chartMargin * 2,
//         chartLeft: chartMargin / 2,
//         chartTop: chartMargin / 2,
//         xAxisHeight,
//         chartRows: 5,
//         chartColumns: 6,
//         range: [0, 90],
//       };
//
//       const { columns } = inputData;
//       const chartColumnsShow = {};
//       Object.keys(columns).forEach((columnKey) => {
//         if (columnKey !== 'x') {
//           chartColumnsShow[columnKey] = true;
//         }
//       });
//       const currentColumnValues = cutColumnValue(columns, chartParams.range);
//       Object.assign(
//         chartParams,
//         getAdditionalChartParams.call(chartParams, currentColumnValues),
//       );
//
//       this.yMaxValue = getAdditionalChartParams.call(chartParams, columns).yMaxValue;
//       setTimeout(() => this.setState({
//         currentColumnValues,
//         chartParams,
//         chartColumnsShow,
//         isSvgStretched: true,
//       }), 0);
//     }
//   }
//
//   componentWillUnmount() {
//     window.removeEventListener('resize', this.updateDimensions);
//   }
//
//
//   updateDimensions = () => {
//     this.componentDidMount();
//   }
//
//   //
//   // chartChangeRange = (rangeAfter) => {
//   //   const { chartParams, chartColumnsShow } = this.state;
//   //   chartParams.range = rangeAfter;
//   //   const { columns } = this.props.inputData; // eslint-disable-line
//   //   const rangeAfterValues = cutColumnValue(columns, rangeAfter);
//   //   Object.entries(chartColumnsShow).forEach((col) => {
//   //     const key = col[0];
//   //     const value = col[1];
//   //     if (!value) {
//   //       rangeAfterValues[key] = null;
//   //     }
//   //   });
//   //   Object.assign(
//   //     chartParams,
//   //     getAdditionalChartParams.call(chartParams, rangeAfterValues),
//   //   );
//   //   this.setState({
//   //     currentColumnValues: rangeAfterValues,
//   //     chartParams,
//   //   });
//   // }
//   //
//   //
//   // chartSelect = (selectName) => {
//   //   const { inputData } = this.props;
//   //   chartSelectAnimation.call(this, inputData, selectName);
//   // }
//
//
//   showNotification = (e) => {
//     const { containerOffsetLeft, svgRef } = this;
//     const { currentColumnValues, chartParams } = this.state;
//     const { colors } = this.props.inputData;
//     this.setState({
//       notification: getNotificationRenderData(currentColumnValues, chartParams, svgRef.current, containerOffsetLeft, colors, e),
//     });
//   }
//
//
//   removeNotification = () => {
//     this.setState({
//       notification: {
//         isShow: false,
//       },
//     });
//   }
//
//
//   render() {
//     const { inputData } = this.props;
//
//     const {
//       notification,
//       isSvgStretched,
//       currentColumnValues,
//       chartParams,
//       chartColumnsShow,
//     } = this.state;
//
//
//     return (
//       <Fragment>
//         <svg
//           className={`${SVG_CLASS_NAME}--${this.props.theme}`}
//           onMouseMove={this.showNotification}
//           onMouseLeave={this.removeNotification}
//           ref={this.svgRef}
//         >
//           {isSvgStretched ? (
//             <Fragment>
//               <rect
//                 className="chart-background"
//                 width={chartParams.containerWidth}
//                 height={chartParams.containerHeight}
//               />
//               <ChartAxisX
//                 chartParams={chartParams}
//                 chartColumnValues={inputData.columns.x}
//               />
//               { Object.values(chartColumnsShow).includes(true)
//                 ? (
//                   <Fragment>
//                     <ChartAxisY chartParams={chartParams} globalYmaxValue={this.yMaxValue} />
//                     {Object.entries(currentColumnValues).map((col, i) => {
//                       const colName = col[0];
//                       const colValue = col[1];
//                       if (colValue !== null && colName !== 'x') {
//                         const chartStyle = {
//                           stroke: inputData.colors[colName],
//                         };
//                         const key = colName + colValue[i];
//                         return (
//                           <Chart
//                             key={key}
//                             chartParams={chartParams}
//                             chartColumnValues={colValue}
//                             styles={chartStyle}
//                           />
//                         );
//                       }
//                       return null;
//                     })}
//                     {notification.isShow ? <Notification {...notification} /> : null}
//                   </Fragment>
//                 )
//                 : null}
//             </Fragment>
//           ) : null}
//         </svg>
//         {/*{isSvgStretched ? (*/}
//         {/*  <Fragment>*/}
//         {/*    <ChartMap*/}
//         {/*      range={chartParams.range}*/}
//         {/*      chartSVGMapProps={chartSVGMapProps}*/}
//         {/*      className={`${this.props.className}--${theme}`}*/}
//         {/*      inputData={inputData}*/}
//         {/*      callbackChartChangeRange={this.chartChangeRange}*/}
//         {/*    />*/}
//         {/*    <ChartSelector inputData={inputData} chartSelect={chartColumnsShow} theme={theme} callback={this.chartSelect} />*/}
//         {/*  </Fragment>*/}
//         {/*) : null}*/}
//       </Fragment>
//     );
//   }
// }

// enableNotification

import React, { PureComponent } from 'react';
import ChartJS from './components/ChartGraphic';
import ChartJSMap from './components/ChartGraphicMap';

class ChartJSContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      range: [0, 90],
    };
  }

  updateRange = (newRange) => {
    this.setState({
      range: newRange,
    });
  };

  render() {
    const { range } = this.state;
    return (
      <>
        <ChartJS {...this.props} range={range} enable={{ notification: true, axisX: true, axisY: true }} />
        <ChartJSMap {...this.props} updateRange={this.updateRange} />
        </>
    );
  }
}

export default ChartJSContainer;
