import React, { Component } from 'react';
import ChartJS from './chart/Index';
import inputData from '../data/index';

class App extends Component {
  componentDidMount() {

  }

  render() {
    const chartSVGProps = {
      id: 'chartJS-container', height: '500px', width: '100%', position: 'relative',
    };


    return (
      <ChartJS inputData={inputData[1]} chartSVGProps={chartSVGProps} />
    );
  }
}

export default App;
