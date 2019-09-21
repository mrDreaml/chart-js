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

    return (
      <Fragment>
        <header>
          <button className="chart-theme--selector" onClick={this.changeTheme} type="button">{this.themes[theme]}</button>
        </header>
        <h2>Followers</h2>
        { inputData.map((currentData, i) => {
          const chartSVGProps = {
            id: `chartJS-container${i}`, className: 'ChartJS', height: '500px', width: '100%', position: 'relative',
          };
          const chartSVGMapProps = {
            id: `chartJS-container-map${i}`, className: 'ChartJS-map', height: '100px', width: '100%', position: 'relative',
          };
          const key = Object.values(currentData.columns.x).slice(0, 10).reduce((acc, v) => acc + v) + i;
          const chartName = `Chart №${i}`;
          return (
            <Fragment key={key}>
              <h2>{chartName}</h2>
              <ChartJS key={`${key}chart`} inputData={currentData} chartSVGProps={chartSVGProps} chartSVGMapProps={chartSVGMapProps} theme={this.themes[theme]} />
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

export default App;
