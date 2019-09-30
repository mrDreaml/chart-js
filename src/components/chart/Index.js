import React, { PureComponent } from 'react';
import ChartJS from './components/ChartGraphic';
import ChartJSMap from './components/ChartGraphicMap';
import ChartSelector from './components/ChartSelector';

class ChartJSContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      range: [0, 90],
      selectedGraphics: [],
      width: window.innerWidth,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
    const { inputData } = this.props;
    this.setState({
      selectedGraphics: Object.keys(inputData.names).reduce((result, name) => {
        result[name] = true;
        return result;
      }, {}),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateRange = (newRange) => {
    this.setState({
      range: newRange,
    });
  };

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth,
    });
  };

  graphicSwitcher = (graphicName) => {
    const { selectedGraphics } = this.state;
    selectedGraphics[graphicName] = !selectedGraphics[graphicName];
    this.setState({
      selectedGraphics: {
        ...selectedGraphics,
      },
    });
  };

  render() {
    const { width, selectedGraphics } = this.state;
    return (
      <>
        <ChartJS
          {...this.props}
          {...this.state}
          enable={{ notification: true, axisX: true, axisY: true }}
          selectedGraphics={selectedGraphics}
        />
        <ChartJSMap {...this.props} width={width} updateRange={this.updateRange} selectedGraphics={selectedGraphics} />
        <ChartSelector {...this.props} graphicSwitcher={this.graphicSwitcher} selectedGraphics={selectedGraphics} />
      </>
    );
  }
}

export default ChartJSContainer;
