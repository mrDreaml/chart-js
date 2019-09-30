import React from 'react';

const ChartSelector = ({
  graphicSwitcher, selectedGraphics, theme, inputData: { colors },
}) => (
  <div className={`${'chart-select--container--'}${theme}`}>
    {Object.keys(selectedGraphics).map((buttonName) => {
      const style = {
        background: colors[buttonName],
      };
      const selectStatus = selectedGraphics[buttonName] ? 'select' : 'non-select';
      return (
        <button onClick={() => graphicSwitcher(buttonName)} key={buttonName} className="chart-select-button" type="button">
          <div style={style} className={`chart--circle-color chart--circle-color-${selectStatus}`} />
          <span>{buttonName}</span>
        </button>
      );
    })}
  </div>
);

export default ChartSelector;
