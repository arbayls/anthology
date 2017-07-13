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

function getData (url, callback, author, twitterHandle) {
  var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b")
  client.article.get({
    url: url
    }, function onSuccess(response) {
        callback(response, author)
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

  //object passed into incParser
  var incObj = {
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase()
  }
  getData(incMag, incParser, incObj)

  //object passed into businessInsiderParser
  var businessInsiderObj = {
    firstName: firstName.toLowerCase(),
    lastName: lastName.toLowerCase()
  }
  getData(businessInsider, businessInsiderParser, businessInsiderObj)

  var mediumObj = {
    twitterHandle: twitterHandle
  }
  getData(medium, mediumParser, mediumObj)
}


//Parses data received from inc and returns http addresses written by freelancer
function incParser(response, author) {
  var parsedData = JSON.parse(response);
  var allIncArticles = parsedData.objects[0].links;
  var incAuthorArticles = allIncArticles.filter(function(article) {
    return article.includes("www.inc.com/" + author.firstName + "-" + author.lastName);
  })
  console.log("Here is the inc data ", incAuthorArticles);
  return incAuthorArticles;
}

//Parses data received from business insider and returns http addresses written by freelancer
function businessInsiderParser(response, author) {
  var parsedData = JSON.parse(response);
  var allBusinessInsiderArticles = parsedData.objects[0].links;
  var businessInsiderAuthorArticles = allBusinessInsiderArticles.filter(function(article) {
    return article.includes("www.businessinsider.com/");
  })
  console.log("Here is the business insider data ", businessInsiderAuthorArticles);
  return businessInsiderAuthorArticles;
}

function mediumParser(response, author) {
  var parsedData = JSON.parse(response);
  console.log("Here is the medium data ", parsedData);
  // var allMediumArticles = parsedData.objects[0].links;
  // var mediumAuthorArticles = allMediumArticles.filter(function(article) {
  //   return article.includes("www.medium.com/");
  // })
  // console.log("Here is the medium data ", mediumAuthorArticles);
  // return mediumAuthorArticles;
}


export default App;
