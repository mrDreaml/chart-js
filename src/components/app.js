import React, { Component } from 'react';
import ChartJS from './chart/chartJS';
import chartInputData from '../data/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.chartSVGProps = {
      id: 'chartJS-container', height: '500px', width: '100%', position: 'relative',
    };
    this.state = {
      svgIsLoaded: false,
    };
  }

  componentDidMount() {
    this.setState({
      svgIsLoaded: true,
    });
  }

  render() {
    const { chartSVGProps } = this;
    const { svgIsLoaded } = this.state;

    return (
      <svg {...chartSVGProps}>
        { svgIsLoaded ? <ChartJS inputData={chartInputData[0]} containerID={chartSVGProps.id} /> : <span />}
      </svg>
    );
  }
}

export default App;
