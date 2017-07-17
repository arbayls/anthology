import React, { Component } from 'react';
import './App.css';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';
import SubmitSearch from './Components/submitSearch'
import DisplayArticles from './Components/displayArticles'
import Login from './Components/Login';

class App extends Component {
  constructor() {
    super();
    this.state = {user: localStorage.getItem('user')}
  }
  render() {
    if (this.state.user) {
      return (
        <div className="App">
          <div className="container">
            <div className="header">
              <h1>Anthology</h1>
            </div>
            <SubmitSearch></SubmitSearch>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="container">
            <div className="header">
              <h1>Anthology</h1>
            </div>
            <Login />
          </div>
        </div>
      )
    }
  }
}

export default App;
