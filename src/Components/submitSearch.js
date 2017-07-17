import React, { Component } from 'react';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';
import DisplayArticles from './displayArticles'

class SubmitSearch extends Component {
  constructor() {
    super();
    this.state = {articles: null}
  }

  render () {
    if (this.state.articles) {
      return (
        <div id="searchForm">
          <h2>Author Information Form</h2>
          <form className="api">
            <input id="author" type="text" name="Author" placeholder="Author" ref="author"></input>
            <input id="handle" type="text" name="Handle" placeholder="Handle" ref="handle"></input>
            <button id="submit" type="button" name="Submit" onClick={findArticles.bind(this)}>Submit</button>
          </form>
          <DisplayArticles articles={this.state.articles}></DisplayArticles>
        </div>
      )
    } else {
      return (
        <div id="searchForm">
          <h2>Author Information Form</h2>
          <form className="api">
            <input id="author" type="text" name="Author" placeholder="Author" ref="author"></input>
            <input id="handle" type="text" name="Handle" placeholder="Handle" ref="handle"></input>
            <button id="submit" type="button" name="Submit" onClick={findArticles.bind(this)}>Submit</button>
          </form>
        </div>
      )
    }
  }
}

function findArticles(e) {
  localStorage.setItem('test', 'test!')
  e.preventDefault();
  let self = this;
  console.log(self.refs);
  axios.post('http://localhost:3000/articles', {author: this.refs.author.value, handle: this.refs.handle.value})
    .then(function(response) {
      console.log("Here is your res: ", response);
      var data = response.data;
      console.log(data);
      self.setState({articles: data})
    })
    .catch(function(error) {
      console.log("ERR", error);
    })
}


export default SubmitSearch;
