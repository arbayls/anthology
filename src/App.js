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
         <div id="results">
         </div>
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
  var clearvoice = ('https://www.clearvoice.com/author/' + firstName + lastName)
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
  //object passed into clearvoiceParser
  var clearvoiceObj = {
    firstName: firstName,
    lastName: lastName
  }

  var retriever = new DataRetriever();
  retriever.load(incMag, incParser, incObj);
  retriever.load(businessInsider, businessInsiderParser, businessInsiderObj);
  retriever.load(clearvoice, clearvoiceParser, clearvoiceObj);
  retriever.getLoaded();
}

//Parses data received from inc and returns array of http addresses written by freelancer
function incParser(response, author) {
  var parsedData = response;
  var allIncArticles = parsedData.objects[0].links;
  var incAuthorArticles = allIncArticles.filter(function(article) {
    return article.includes("www.inc.com/" + author.firstName + "-" + author.lastName);
  })
  this.rejoin(incAuthorArticles)
}

//Parses data received from business insider and returns array of http addresses written by freelancer
function businessInsiderParser(response, author) {
  var parsedData = response;
  var allBusinessInsiderArticles = parsedData.objects[0].links;
  var businessInsiderAuthorArticles = allBusinessInsiderArticles.filter(function(article) {
    return article.includes("www.businessinsider.com/");
  })
  this.rejoin(businessInsiderAuthorArticles)
}

function clearvoiceParser(response, author) {
  var parsedData = response;
  var allClearvoiceArticles = parsedData.objects[0].links;
  var clearvoiceAuthorArticles = allClearvoiceArticles.filter(function(article) {
    return (article.includes("www.clearvoice.com/")) && (!article.includes("www.clearvoice.com/software")) && (!article.includes("www.clearvoice.com/category")) && (!article.includes("www.clearvoice.com/contact")) && (!article.includes("www.clearvoice.com/blog")) &&
    (!article.includes("www.clearvoice.com/about")) &&
    (!article.includes("www.clearvoice.com/solutions")) &&
    (!article.includes("www.clearvoice.com/pricing")) &&
    (!article.includes("www.clearvoice.com/careers")) &&
    (!article.includes("www.clearvoice.com/terms")) &&
    (!article.includes("www.clearvoice.com/privacy")) &&
    (!article.includes("www.clearvoice.com/author"));
  })
  this.rejoin(clearvoiceAuthorArticles)
}

function twitterParser(response, twitterHandle) {
//add twitter stuff here...
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
    console.log("YIPPEE!");
    console.log(this.data);
    embedlyCardMaker(this.data)
  }
}

function embedlyCardMaker (data) {
  var cards = document.querySelector("#results");
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      console.log(data[i][j]);
      var card = document.createElement("a")
      card.href = data[i][j];
      card.className = "embedly-card"
      card["data-card-key"]= "82db3e7ef863409080c2999dbf364c86"
      card.style.display="inline-block"
      cards.appendChild(card);
    }
  }
  console.log(cards);
}

export default App;
