import cutColumnValue from './cutColumnValues';
import getAdditionalChartParams from './getAdditionalChartParams';

export default function (inputData, selectName) {
  const { chartColumnsShow, currentColumnValues, chartParams } = this.state;
  chartColumnsShow[selectName] = !chartColumnsShow[selectName];
  const columnValues = Object.assign({}, currentColumnValues);
  let timeNow = Date.now();
  const durationI = 10;
  const delay = 1000 / 200;
  const stretchRatio = 1.3;
  let hiddenChartColumn;
  if (chartColumnsShow[selectName]) {
    const hiddenChartColumns = cutColumnValue(inputData.columns, chartParams.range);
    hiddenChartColumn = hiddenChartColumns[selectName];
    Object.assign(
      chartParams,
      getAdditionalChartParams.call(chartParams, hiddenChartColumns),
    );
    this.setState({
      chartParams,
    });
  }
  let i = 0;
  const self = this;
  function animationStep() {
    if (Date.now() - timeNow >= delay) {
      timeNow = Date.now();
      i++; // eslint-disable-line

      // hidden chart
      if (!chartColumnsShow[selectName]) {
        columnValues[selectName] = columnValues[selectName].map(value => value * stretchRatio);
        self.setState({
          currentColumnValues: columnValues,
        });
      // show chart
      } else if (hiddenChartColumn !== undefined) {
        columnValues[selectName] = hiddenChartColumn.map(value => value * stretchRatio * (durationI - i + 1));
        self.setState({
          currentColumnValues: columnValues,
        });
      }
    }
    if (i < durationI) {
      window.requestAnimationFrame(animationStep);
    } else {
    // already hidden
      if (!chartColumnsShow[selectName]) {
        columnValues[selectName] = null;
        Object.assign(
          chartParams,
          getAdditionalChartParams.call(chartParams, columnValues),
        );
        self.setState({
          chartParams,
        });
      }
      if (hiddenChartColumn !== undefined) {
        columnValues[selectName] = hiddenChartColumn;
        setTimeout(() => {
          self.setState({
            chartColumnsShow,
            currentColumnValues: columnValues,
            chartParams,
          });
        }, delay);
      }
    }
  }
  window.requestAnimationFrame(animationStep);
}
