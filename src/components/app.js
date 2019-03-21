import React, { Component, Fragment } from 'react';
import ChartJS from './chart/Index';
import inputData from '../data/index';

import './chart/styles/pageStyle.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.themes = ['dark-theme', 'light-theme'];
    const theme = 0;
    this.state = { theme };

    this.changeTheme = this.changeTheme.bind(this);
  }

  componentDidMount() {
    const body = document.getElementsByTagName('body')[0];
    const { theme } = this.state;
    body.className = this.themes[theme];
  }

  changeTheme() {
    const { theme } = this.state;
    const newTheme = Math.abs(theme - 1);
    const body = document.getElementsByTagName('body')[0];
    body.className = this.themes[newTheme];
    this.setState({
      theme: newTheme,
    });
  }

  render() {
    const { theme } = this.state;
    const chartSVGProps = {
      id: 'chartJS-container', className: 'ChartJS', height: '500px', width: '100%', position: 'relative',
    };
    const chartSVGMapProps = {
      id: 'chartJS-container-map', className: 'ChartJS-map', height: '100px', width: '100%', position: 'relative',
    };

    return (
      <Fragment>
        <header>
          <button className="chart-theme--selector" onClick={this.changeTheme} type="button">{this.themes[theme]}</button>
        </header>
        <h2>Followers</h2>
        <ChartJS inputData={inputData[4]} chartSVGProps={chartSVGProps} chartSVGMapProps={chartSVGMapProps} theme={this.themes[theme]} />
      </Fragment>
    );
  }
}

export default App;
