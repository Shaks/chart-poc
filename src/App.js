import React, { Component } from 'react';
import logo from './logo.svg';
import ChartComponent from './ChartComponent';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          <ChartComponent />
        </div>
      </div>
    );
  }
}

export default App;