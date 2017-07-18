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
        <div className="searchForm login">
          <div className="search-container login-container">
          <div className="logoWrapper"></div>
            <h2>Author Information</h2>
            <form className="api userInfo">
              <input id="author username" type="text" name="Author" placeholder="Author" ref="author"></input>
              <input id="handle password" type="text" name="Handle" placeholder="Twitter Handle" ref="handle"></input>
              <p>You may provide a link to your author page <br></br> from any website in the spaces below. <br></br> <br></br> Example: <br></br> https://www.clearvoice.com/author/john-doe </p>
              <input id="handle password" type="text" name="Handle" placeholder="  Author Page" ></input>
              <input id="handle password" type="text" name="Handle" placeholder="  Author Page" ></input>
              <button id="submit" type="button" name="Submit" onClick={findArticles.bind(this)}>Submit</button>
            </form>
          </div>
          <div className="results-container hero2">
            <DisplayArticles articles={this.state.articles}></DisplayArticles>
          </div>
          <div className="light"></div>
          <div className="dark"></div>
        </div>
      )
    } else {
      return (
        <div className="searchForm login">
        <div className="search-container login-container">
        <div className="logoWrapper"></div>
          <h2>Author Information</h2>
          <form className="api userInfo">
            <input id="author username" type="text" name="Author" placeholder="  Author Name" ref="author"></input>
            <input id="handle password" type="text" name="Handle" placeholder="  Twitter Handle" ref="handle"></input>
            <p>You may provide a link to your author page <br></br> from any website in the spaces below. <br></br> <br></br> Example: <br></br> https://www.clearvoice.com/author/john-doe </p>
            <input id="handle password" type="text" name="Handle" placeholder="  Author Page" ></input>
            <input id="handle password" type="text" name="Handle" placeholder="  Author Page" ></input>
            <button id="submit submitLogin" type="button" name="Submit" onClick={findArticles.bind(this)}>Submit</button>
          </form>
          </div>
          <div className="results-container hero2"></div>
          <div className="light"></div>
          <div className="dark"></div>
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
  axios.post('http://localhost:3000/articles', {author: self.refs.author.value, handle: self.refs.handle.value})
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
