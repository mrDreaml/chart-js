import React from 'react';
import Button from './Button';

export default ({ theme, changeTheme }) => (
  <header>
    <Button classNameProp="chart-theme--selector" onClick={changeTheme} textValue={theme} />
  </header>
);
