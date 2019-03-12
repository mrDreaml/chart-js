import inputData from './chartInputData';


inputData.forEach((charts) => {
  const newColumns = {};
  charts.columns.forEach((column) => {
    newColumns[column.shift()] = column;
  });
  charts.columns = newColumns; // eslint-disable-line
});

export default inputData;
