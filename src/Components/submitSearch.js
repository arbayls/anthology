import React, { Component } from 'react';
import Diffbot from 'diffbot-node-client';
import axios from 'axios';
import DisplayArticles from './displayArticles'
import Loader from '../loader.svg'

class SubmitSearch extends Component {
  constructor() {
    super();
    this.state = {articles: null, loading: false}
  }

  render () {
    if (this.state.articles && !this.state.loading) {
      return (
        <div className="searchForm login">
          <div className="search-container login-container">
          <div className="logoWrapper"></div>
            <h2>Author Information</h2>
            <form className="api userInfo">
              <input id="author username" type="text" name="Author" placeholder="Author" ref="author"></input>
              <input id="handle password" type="text" name="Handle" placeholder="Twitter Handle" ref="handle"></input>
              <p>You may provide a link to your author page <br></br> from any website in the spaces below. <br></br> <br></br> Example: <br></br> https://www.clearvoice.com/author/john-doe </p>
              <input id="handle password" type="text" name="Handle" placeholder="  Link to Author Page" ref="websites"></input>
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
    } else if (!this.state.loading && !this.state.articles){
      return (
        <div className="searchForm login">
        <div className="search-container login-container">
        <div className="logoWrapper"></div>
          <h2>Search for Your Content</h2>
          <form className="api userInfo">
            <input id="author username" type="text" name="Author" placeholder="  Author's Full Name" ref="author"></input>
            <input id="handle password" type="text" name="Handle" placeholder="  Twitter Handle" ref="handle"></input>
            <p>You may provide links to your author page <br></br> from any website in the spaces below. <br></br> <br></br> Example: <br></br> https://www.clearvoice.com/author/JohnDoe </p>
            <input id="handle password" type="text" name="Handle" placeholder="  Link to Author Page" ref="websites"></input>
            <button id="submit submitLogin" type="button" name="Submit" onClick={findArticles.bind(this)}>Submit</button>
          </form>
          </div>
          <div className="results-container hero2">
            <div className="alert">
              <p>Your content will appear here after your search. <br />The process may take a few minutes, so please don&apos;t refresh your page.</p>
            </div>
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
          <h2>Search for Your Content</h2>
          <form className="api userInfo">
            <input id="author username" type="text" name="Author" placeholder="  Author's Full Name" ref="author"></input>
            <input id="handle password" type="text" name="Handle" placeholder="  Twitter Handle" ref="handle"></input>
            <p>You may provide links to your author page <br></br> from any website in the spaces below. <br></br> <br></br> Example: <br></br> https://www.clearvoice.com/author/JohnDoe </p>
            <input id="handle password" type="text" name="Handle" placeholder="  Link to Author Page" ref="websites"></input>
            <button id="submit submitLogin" type="button" name="Submit" onClick={findArticles.bind(this)}>Submit</button>
          </form>
          </div>
          <div className="results-container hero2">
            <div className="alert">
              <img src={Loader}></img>
              <p>Your content will appear here after your search. <br />The process may take a few minutes, so please don&apos;t refresh your page.</p>
            </div>
          </div>
          <div className="light"></div>
          <div className="dark"></div>
        </div>
      )
    }
  }
}

function findArticles(e) {
  e.preventDefault();
  let self = this;
  self.setState({articles: null, loading: true})
  console.log(self.refs);
  var first = self.refs.author.value.split(" ")[0];
  var last = self.refs.author.value.split(" ")[1] || "";
  var sites = self.refs.websites.value.split(",");
  var results = [];
  var join = rejoin.bind(self);
  for (var i = 0; i < sites.length; i++) {
    var site = sites[i].trim();
    results.push(site);
    axios.post('http://localhost:3000/articles', {firstName: first, lastName: last, site: site})
    .then(function(response) {
      console.log("Here is your res: ", response);
      var data = response.data;
      console.log(JSON.parse(data));
      if (JSON.parse(data).objects) {

        join(JSON.parse(data).objects[0].links, results);
      } else {
        join([], results);
      }
      // self.setState({articles: data})
    })
    .catch(function(error) {
      console.log("ERR", error);
      join([], results);
    })
  }
  results.push([]);
}

function rejoin(data, results) {
  var self = this;
  var responses = results[results.length - 1];
  responses.push(data);
  console.log("RESULT LEN: ", results.length - 1);
  console.log("RESPONSE LEN: ", responses.length);
  console.log(responses);
  if (responses.length === results.length - 1) {
    console.log("SELF IS HERE: ", self);
    self.setState({articles: responses, loading: false});
  }
}


export default SubmitSearch;
