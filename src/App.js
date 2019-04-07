import React, { Component } from 'react';
import { Button } from 'antd';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  swTheme(color) {
    window.less.modifyVars({
      '@primary-color': color
    });
  }
  render() {
    return (
      <div className="App primary">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button onClick={() => this.swTheme('#ffea00')}>#ffea00</Button>
          <Button onClick={() => this.swTheme('#39C5BB')}>#39C5BB</Button>
        </header>
      </div>
    );
  }
}

export default App;
