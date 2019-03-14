import React, { Component } from 'react';
import getAdditionalChartParams from './getAdditionalChartParams';
import ChartPoints from './chartPoints';

class ChartJS extends Component {
  constructor(props) {
    super(props);
    const { containerID } = this.props; // eslint-disable-line

    const chartContainer = document.getElementById(containerID);
    this.chartParams = {
      containerWidth: chartContainer.clientWidth,
      containerHeight: chartContainer.clientHeight,
      chartRows: 5,
      chartColumns: 6,
    };

    const { columns } = this.props.inputData; // eslint-disable-line
    Object.assign(this.chartParams, getAdditionalChartParams.call(this.chartParams, columns));
  }

  componentDidMount() {
  }

  render() {
    const { columns } = this.props.inputData; // eslint-disable-line
    return (
      <ChartPoints chartParams={this.chartParams} columns={columns} />
    );
  }
}

export default ChartJS;
