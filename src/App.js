import React, { Component } from 'react';
import './App.css';
import Diffbot from 'diffbot-node-client'
class App extends Component {
  render() {
    return (
      <div className="App">
      <h2>Author Information Form</h2>
      <form className="api" onSubmit={getData}>
          <input id="author" type="text" name="Author" placeholder="Author"></input>
          <input id="handle" type="text" name="Handle" placeholder="Handle"></input>
          <button id="submit" type="button" name="Submit" onClick={dataGetter}>Submit</button>
      </form>
      </div>
    );
  }
}
function getData (url, callback, author, sources) {
  var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b")
  client.article.get({
    url: url
    }, function onSuccess(response) {
        callback(response, author, sources)
    }, function onError(response) {
        console.log(JSON.parse(response));
    })
}
//formats input from form into searchable http addresses, and fires getData functions for individual api calls.
function dataGetter () {
  var author = document.querySelector('#author').value;
  var firstName = author.split(' ')[0];
  var lastName = author.split(' ')[1];
  var twitterHandle = document.querySelector('#handle').value;
  var incMag = ('https://www.inc.com/author/' + firstName.toUpperCase() + '-' + lastName.toUpperCase())
  var twitter = ('https://twitter.com/' + twitterHandle)
  var businessInsider = ('http://www.businessinsider.com/author/' + firstName.toLowerCase() + '-' + lastName.toLowerCase() + "/date/desc")
  var medium = ('https://www.medium.com/' + '@' + twitterHandle)
  var sources = [];
  //object passed into incParser
  var incObj = {
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase()
  }
  //object passed into businessInsiderParser
  var businessInsiderObj = {
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase()
  }
  var mediumObj = {
    twitterHandle: twitterHandle
  }
  var retriever = new DataRetriever();
  retriever.load(incMag, incParser, incObj);
  retriever.load(businessInsider, businessInsiderParser, businessInsiderObj);
  retriever.load(medium, mediumParser, mediumObj);
  retriever.getLoaded();
}
//Parses data received from inc and returns http addresses written by freelancer
function incParser(response, author) {
  var parsedData = response;
  var allIncArticles = parsedData.objects[0].links;
  var incAuthorArticles = allIncArticles.filter(function(article) {
    return article.includes("www.inc.com/" + author.firstName + "-" + author.lastName);
  })
  console.log("Here is the inc data ", incAuthorArticles);
  this.rejoin(incAuthorArticles)
}
//Parses data received from business insider and returns http addresses written by freelancer
function businessInsiderParser(response, author) {
  var parsedData = response;
  var allBusinessInsiderArticles = parsedData.objects[0].links;
  var businessInsiderAuthorArticles = allBusinessInsiderArticles.filter(function(article) {
    return article.includes("www.businessinsider.com/");
  })
  console.log("Here is the business insider data ", businessInsiderAuthorArticles);
  this.rejoin(businessInsiderAuthorArticles)
}
function mediumParser(response, author) {
  var parsedData = response;
  console.log("Here is the medium data ", parsedData);
  // var allMediumArticles = parsedData.objects[0].links;
  // var mediumAuthorArticles = allMediumArticles.filter(function(article) {
  //   return article.includes("www.medium.com/");
  // })
  // console.log("Here is the medium data ", mediumAuthorArticles);
  // return mediumAuthorArticles;
  this.rejoin(parsedData);
}
function DataRetriever() {
  this.data = [];
  this.loaded = [];
  this.numReceived = 0;
}
DataRetriever.prototype.load = function(url, callback, data) {
  this.loaded.push({url: url, callback: callback, data: data});
}
DataRetriever.prototype.getLoaded = function() {
  var self = this;
  for (var i = 0; i < self.loaded.length; i++) {
    var getResponseFor = getResponses.bind(self);
    getResponseFor(self.loaded[i]);
  }
}
function getResponses(data) {
  var self = this;
  var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b")
  client.article.get({
    url: data.url
    }, function onSuccess(response) {
        var cb = data.callback.bind(self);
        cb(JSON.parse(response), data.data)
    }, function onError(response) {
        console.log(JSON.parse(response));
    })
}
DataRetriever.prototype.rejoin = function(data) {
  this.data.push(data);
  this.numReceived++;
  if (this.numReceived === this.loaded.length) {
    console.log("YIPPEEEEEE");
    console.log(this.data);
  }
}
export default App;
