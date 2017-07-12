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

function getData (url) {
  var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b")
  client.article.get({
            url: url
        }, function onSuccess(response) {
          // console.log('Here is your error! ', err);
          console.log(JSON.parse(response));
            // output the title
            // console.log('Here is your response data! ',response);
            // var element = document.getElementById("content");
            // element.innerHTML = response["objects"][0]["title"];
        }, function onError(response) {
          console.log(JSON.parse(response));
        })
      }
        // function onError(response) {
        //       switch(response.errorCode) {
        //         case 401:
        //             alert(response.error)
        //             break;
        //         case 404:
        //             alert(response.error)
        //             break;
        //         case 500:
        //             alert(response.error)
        //             break;
        //       }
        // });
// }

function dataGetter () {
var author = document.querySelector('#author').value;
var firstName = author.split(' ')[0];
var lastName = author.split(' ')[1];
var twitterHandle = document.querySelector('#handle').value;
var incMag = ('https://www.inc.com/author/' + firstName + '-' + lastName)
var twitter = ('https://twitter.com/' + twitterHandle)
var businessInsider = ('http://www.businessinsider.com/author/' + firstName.toLowerCase() + '-' + lastName.toLowerCase() + "/date/desc")
getData(incMag)
getData(twitter)
getData(businessInsider)
}

export default App;
