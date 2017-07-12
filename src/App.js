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

function getData (url, callback) {
  var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b")
  client.article.get({
    url: url
    }, function onSuccess(response) {
        callback(response)
    }, function onError(response) {
        console.log(JSON.parse(response));
    })
}


function dataGetter () {
var author = document.querySelector('#author').value;
var firstName = author.split(' ')[0];
var lastName = author.split(' ')[1];
var twitterHandle = document.querySelector('#handle').value;
var incMag = ('https://www.inc.com/author/' + firstName.toUpperCase() + '-' + lastName.toUpperCase())
var twitter = ('https://twitter.com/' + twitterHandle)
var businessInsider = ('http://www.businessinsider.com/author/' + firstName.toLowerCase() + '-' + lastName.toLowerCase() + "/date/desc")
getData(incMag, incParser)
getData(twitter)
getData(businessInsider)
}


//Parses data received from inc and returns http addresses written by freelancer
function incParser(response) {
  var parsedData = JSON.parse(response);
  var allArticles = parsedData.objects[0].links;
  var authorArticles = allArticles.filter(function(article) {
    return article.includes("https://www.inc.com/larry-kim/");
  })
  return authorArticles;
}


export default App;
