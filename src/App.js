import React, { Component } from 'react';
import './App.css';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';
import SubmitSearch from './Components/submitSearch'
import DisplayArticles from './Components/displayArticles'

class App extends Component {
  render() {
    return (
      <div className="App">
         <SubmitSearch></SubmitSearch>
      </div>
    );
  }
}

export default App;
