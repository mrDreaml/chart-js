export default function (columns, range) {
  const cutColumnsValues = {};
  Object.entries(columns).forEach(([key, value]) => {
    cutColumnsValues[key] = value.slice(...range);
  });

  return cutColumnsValues;
}
