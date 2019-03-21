import React from 'react';

function ChartSelector(props) {
  const { colors, names } = props.inputData;
  const { callback, chartSelect } = props;
  return Object.values(names).map((buttonName) => {
    const columnName = buttonName.replace(/#/, 'y');
    const style = {
      background: colors[columnName],
    };
    const selectStatus = chartSelect[columnName] ? 'select' : 'non-select';
    return (
      <button onClick={() => callback(columnName)} key={buttonName} className="chart-select-button" type="button">
        <div style={style} className={`chart--circle-color chart--circle-color-${selectStatus}`} />
        <span>{buttonName}</span>
      </button>
    );
  });
}

export default ChartSelector;
