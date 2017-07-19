var Bing = require('node-bing-api')({ accKey: "f13f5a60955b4e35b071e14eea9a4057" });

Bing.web(`site:businessinsider.com "Larry%20Kim"`, {
  count: 1
}, function(error, res, body) {
  console.log(error);
  console.log(body.webPages.value[0].displayUrl);
  var url = body.webPages.value[0].displayUrl;
  if (!url.includes("https://")) {
    if (!url.includes("http://")) {
      url = "https://" + url;
    }
  }
  var Diffbot = require('diffbot-node-client');
  var client = new Diffbot("4ebd0ead48e5a0c52e8917cdf8ea9868");

  client.article.get({
    url: url
  }, function onSuccess(data) {
        var links = JSON.parse(data).objects[0].links
        console.log(links);
        for (var i = 0; i < links.length; i++) {
          links[i]
          client.article.get({
            url: links[i]
          }, function onSuccess(moreData) {
            if (JSON.parse(moreData).objects) {
              console.log("MOOOOOAR: ", JSON.parse(moreData).objects[0].authors);
              console.log("LEZZZZ: ", JSON.parse(moreData).objects[0].author);

            }
          })
        }
    }, function onError(data) {
      console.log(data.data);
    })
})

//
// var Diffbot = require('diffbot-node-client');
// var client = new Diffbot("59614fe60c56f7800045670876d8c878");
//
// client.article.get({
//   url: "body.webPages.value[0].displayUrl"
// }, function onSuccess(data) {
//       // var links = JSON.parse(data).objects[0].links.filter(link => {return link.includes('https://twitter.com/larrykim/status')})
//       // for (var i = 0; i < links.length; i++) {
//       //   console.log(links[i]);
//       // }
//       console.log(JSON.parse(data).objects);
//   }, function onError(data) {
//     console.log(data.data);
//   })

// var axios = require('axios');
//
// axios.get('http://pokeapi.co/api/v2/pokemon/1/')
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   })
