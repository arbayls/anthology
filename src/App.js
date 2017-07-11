import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Diffbot from './diffbot.js'
import axios from '.axios' //use for API call

class App extends Component {

  //put functions here
  var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b");

  function getData (url) {
    client.article.get({
              url: url
          }, function onSuccess(response) {
              // output the title
              console.log(response);
              var element = document.getElementById("content");
              element.innerHTML = response["objects"][0]["title"];
          }, function onError(response) {
                switch(response.errorCode) {
                  case 401:
                      alert(response.error)
                      break;
                  case 404:
                      alert(response.error)
                      break;
                  case 500:
                      alert(response.error)
                      break;
                }
          });
  }

  function dataGetter () {
  var author = ($('.author').val());
  var firstName = author.split(' ')[0];
  var lastName = author.split(' ')[1];
  var twitterHandle = ($('.handle').val());
  var incMag = ('https://www.inc.com/author/' + firstName + '-' + lastName)
  var twitter = ('https://twitter.com/' + twitterHandle)
  var businessInsider = ('http://www.businessinsider.com/author/' + firstName + '-' + lastName)
  getData(incMag)
  getData(twitter)
  getData(businessInsider)
})

  //use on click method

  render() {
    return (
      <div className="App">
      <h2>Author Information Form</h2>
      <form class="api">  //on submit here
          <input class="author" type="text" name="Author" value="Author">
          <input class="handle" type="text" name="Handle" value="Handle">
          <button class="submit" type="button" name="Submit" >Submit</button> //on click here
      </form>
      </div>
    );
  }
}

export default App;
