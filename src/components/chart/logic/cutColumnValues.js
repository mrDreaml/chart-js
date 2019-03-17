export default function (columns, range) {
  const cutColumnsValues = {};
  Object.entries(columns).forEach((col) => {
    const key = col[0];
    const value = col[1];
    cutColumnsValues[key] = value.slice(...range);
  });

  return cutColumnsValues;
}
