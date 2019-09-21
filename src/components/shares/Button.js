import React from 'react';

export default ({ classNameProp, onClick, textValue = 'Button' }) => <button className={classNameProp} onClick={onClick} type="button">{textValue}</button>;
