import React, { Component } from 'react';
import ChartJS from './chart/chartJS';
import chartInputData from '../data/index';


class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const chartSVGProps = {
      id: 'chartJS-container', height: '500px', width: '100%', position: 'relative',
    };
    return (
      <ChartJS inputData={chartInputData[1]} chartSVGProps={chartSVGProps} />
    );
  }
}

export default App;
