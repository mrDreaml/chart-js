import React, { Component } from 'react';
import ChartJS from './chart/Index';
import inputData from '../data/index';

class App extends Component {
  componentDidMount() {

  }

  render() {
    const chartSVGProps = {
      id: 'chartJS-container', className: 'ChartJS', height: '500px', width: '100%', position: 'relative',
    };
    const chartSVGMapProps = {
      id: 'chartJS-container-map', className: 'ChartJS-map', height: '100px', width: '100%', position: 'relative',
    };


    return (
      <ChartJS inputData={inputData[1]} chartSVGProps={chartSVGProps} chartSVGMapProps={chartSVGMapProps} />
    );
  }
}

export default App;
