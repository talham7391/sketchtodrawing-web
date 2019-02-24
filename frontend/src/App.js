import React, { Component } from 'react';
import * as axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      message: null,
    };

    this.updateMessage = this.updateMessage.bind(this);
  }

  componentDidMount() {
    this.updateMessage();
  }

  async updateMessage() {
    let message = await axios.get('http://localhost:4567');
    this.setState({
      message: message.data,
    });
  }

  render() {
    return (
      <div>{ this.state.message }</div>
    );
  }
}

export default App;
