// var Bing = require('node-bing-api')({ accKey: "f13f5a60955b4e35b071e14eea9a4057" });
//
// Bing.web(`site:businessinsider.com "larry%20kim"`, {
//   count: 1
// }, function(error, res, body) {
//   console.log(error);
//   console.log(body.webPages.value[0].displayUrl);
// })

// var axios = require('axios');
//
// axios.get('http://pokeapi.co/api/v2/pokemon/1/')
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   })


var Diffbot = require('diffbot-node-client');
var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b");

client.article.get({
  url: "https://twitter.com/larrykim/status/885837342594011136"
}, function onSuccess(data) {
      // var links = JSON.parse(data).objects[0].links.filter(link => {return link.includes('https://twitter.com/larrykim/status')})
      // for (var i = 0; i < links.length; i++) {
      //   console.log(links[i]);
      // }
      console.log(JSON.parse(data).objects);
  }, function onError(data) {
    console.log(data.data);
  })
