import React, { Component, Fragment } from 'react';
import ChartJS from './chart/Index';
import inputData from '../data/index';
import Header from './shares/Header';

import constants from './constants/constants';

import './chart/styles/pageStyle.scss';

const { themes } = constants;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { theme: themes.light };
  }

  switchTheme = () => {
    const { theme } = this.state;
    this.setState({
      theme: theme === themes.light ? themes.dark : themes.light,
    });
  };

  render() {
    const { theme } = this.state;
    const body = document.getElementsByTagName('body')[0];
    body.className = theme;

    return (
      <>
        <Header changeTheme={this.switchTheme} theme={theme} />
        <h2>Followers</h2>
        { inputData.map((currentData, i) => {
          return (
            <Fragment key={`Example:${i}`}>
              <h2>{`Chart №${i}`}</h2>
              <ChartJS key={`ChartJS${i}`} inputData={currentData} theme={theme} />
            </Fragment>
          );
        })}
      </>
    );
  }
}

export default App;
