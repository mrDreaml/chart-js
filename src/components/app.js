import React, {Component} from 'react';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
   
    }

  
    render() {
      return (
        <div>
          <h1>Telegram Chart</h1>
        </div>
      );
    }
  }

export default App;