import React, { Component } from 'react';
import { Button } from 'antd';
import './App.css';

class App extends Component {
  swTheme(color) {
    window.less.modifyVars({
      '@primary-color': color
    });
  }
  render() {
    const colors = ['#ffea00', '#39C5BB', 'red']
    return (
      <div className="App primary">
        <header className="App-header">
          <img src="/logo.svg" className="App-logo" alt="logo" />
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
          <Button.Group>
            {
              colors.map((e, i) => <Button key={i} onClick={() => this.swTheme(e)}>{e}</Button>)
            }
          </Button.Group>
        </header>
      </div>
    );
  }
}

export default App;
