import React, { Component } from 'react';
import './App.css';

import SimpleAppBar from './components/header.js';
import CustomGraphiQL from './components/graphiql';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SimpleAppBar />
        <CustomGraphiQL />
      </div>
    );
  }
}

export default App;