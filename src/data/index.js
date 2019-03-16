import inputData from './inputData';

// preparing input data =>

inputData.forEach((charts) => {
  const newColumns = {};
  charts.columns.forEach((column) => {
    newColumns[column.shift()] = column;
  });
  charts.columns = newColumns; // eslint-disable-line
});


export default inputData;
