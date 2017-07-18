import React, { Component } from 'react';
import './App.css';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';
import SubmitSearch from './Components/submitSearch'
import DisplayArticles from './Components/displayArticles'
import Login from './Components/Login';
import Portfolio from './Components/Portfolio';
import Navbar from './Components/Navbar';

class App extends Component {
  constructor() {
    super();
    this.state = {user: localStorage.getItem('user'), isPortfolio: false}
    this.updateState = this.updateState.bind(this)
    this.logout = this.logout.bind(this);
    this.goToPortfolio = this.goToPortfolio.bind(this);
  }
  render() {
    if (this.state.user && !this.state.isPortfolio) {
      return (
        <div className="App">
          <div className="container">
            <Navbar find={this.updateState} goToPortfolio={this.goToPortfolio} logout={this.logout}></Navbar>
            <SubmitSearch></SubmitSearch>
          </div>s
        </div>
      );
    } else if (this.state.user && this.state.isPortfolio) {
      return (
        <div className="App">
          <div className="container">
            <Navbar find={this.updateState} goToPortfolio={this.goToPortfolio} logout={this.logout}></Navbar>
            <Portfolio />
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="container">
            <Navbar find={this.updateState} goToPortfolio={this.goToPortfolio} logout={this.logout}></Navbar>
            <Login updater={this.updateState}/>
          </div>
        </div>
      )
    }
  }

  updateState() {
    console.log("HELLOOOOOO", this);
    this.state = {user: localStorage.getItem('user'), isPortfolio: false}
    this.forceUpdate()
  }

  goToPortfolio() {
    this.state = {user: localStorage.getItem('user'), isPortfolio: true}
    this.forceUpdate()
  }

  logout() {
    localStorage.setItem('user', '');
    this.state = {user: '', isPortfolio: false}
    this.forceUpdate()
  }
}

export default App;
