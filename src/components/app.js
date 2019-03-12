import React, { Component } from 'react';
import ChartJS from './chart/chartJS';
import chartInputData from '../data/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.containerProps = { width: '100%', position: 'relative' };
    this.chartContainerId = 'canvasjs-react-chart-container';
  }

  componentDidMount() {
    this.chart = new ChartJS(this.chartContainerId, chartInputData[0]);
    this.chart.render();
  }

  render() {
    return (
      <canvas id={this.chartContainerId} style={this.containerProps} />
    );
  }
}

export default App;
