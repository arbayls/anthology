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
    this.updateState = this.updateState.bind(this)
  }
  render() {
    if (this.state.user) {
      return (
        <div className="App">
          <div className="container">
            <SubmitSearch></SubmitSearch>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="container">
            <Login updater={this.updateState}/>
          </div>
        </div>
      )
    }
  }

  updateState() {
    console.log("HELLOOOOOO", this);
    this.state = {user: localStorage.getItem('user')}
    this.forceUpdate()
  }
}

export default App;
