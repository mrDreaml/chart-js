import inputData from './inputData';

// preparing input data =>

inputData.forEach((charts) => {
  const newColumns = charts.columns.reduce((acc, [key, ...restArr]) => {
    acc[key] = restArr;
    return acc;
  }, {});
  charts.columns = newColumns; // eslint-disable-line
});

export default inputData;
