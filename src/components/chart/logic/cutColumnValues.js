import constants from "../../constants/constants";

export default (columns, range, chartColumnsShow) => (
  Object.entries(columns).reduce((cutColumnsValues, [key, value]) => {
    if (chartColumnsShow[key] || key === constants.colNameX) {
      cutColumnsValues[key] = value.slice(...range);
    }
    return cutColumnsValues;
  }, {}));
