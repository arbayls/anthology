let express = require('express');
let router = express.Router();
let Diffbot = require('diffbot-node-client');
let Bing = require('node-bing-api')({ accKey: "f13f5a60955b4e35b071e14eea9a4057" });
let client = new Diffbot("4ebd0ead48e5a0c52e8917cdf8ea9868");

router.post('/articles', function(req, res, next) {
  var bingRequest = `site:${req.body.site} "${req.body.firstName}%20${req.body.lastName}"`;

  Bing.web(bingRequest, {
    count: 1
  }, function(error, result, body) {
    if (error !== null) {
      res.json(error);
      return;
    }
    if (!body.webPages) {
      res.json(body);
      return;
    }
    var url = body.webPages.value[0].displayUrl;
    if (!url.includes("https://")) {
      if (!url.includes("http://")) {
        url = "https://" + url;
      }
    }
    client.article.get({
      url: url
    }, function onSuccess(data) {
          if (url.includes("twitter.com")) {
            console.log("TWITTER!");
            data = twitterParser(data)
          } else {
            data = chooseParser(url, data, req.body.firstName, req.body.lastName)
          }
          console.log("~~~~~~~~~", JSON.parse(data).length);
          if (JSON.parse(data).length > 0) {
            res.json(data)
          } else {
            tryHttp(req, res, body.webPages.value[0].displayUrl)
          }
      }, function onError(data) {
          res.json(data);
      })
  })

})
function tryHttp(req, res, url) {
  var httpUrl = "http://" + url;
  console.log("HTTP URL: ", httpUrl);
  client.article.get({
    url: httpUrl
  }, function onSuccess(data) {
    console.log(JSON.parse(data).objects[0].links);
    if (httpUrl.includes("twitter.com")) {
      console.log("TWITTER!");
      data = twitterParser(data)
    } else {
      data = chooseParser(httpUrl, data, req.body.firstName, req.body.lastName)
    }
    res.json(data)
  })
}

function chooseParser(url, data, first, last) {
  if (JSON.parse(data).objects) {
    var base = url.split("/")[0] + "//" + url.split("/")[2];
    console.log("TESTURL: ", base);
    var dash = base + "/" + first + "-" + last
    var parsed = JSON.parse(data);
    var links = parsed.objects[0].links;
    var dashBase = false;
    for (var i = 0; i < links.length; i++) {
      // console.log(links[i]);
      if (links[i].toLowerCase().includes(dash.toLowerCase())) {
        dashBase = true;
      }
    }
    console.log("DBASE: ",dashBase);
    var filtered;
    if (dashBase) {
      filtered = parser(links, dash);
    } else {
      filtered = parser(links, base);
    }
    return JSON.stringify(filtered);
  } else {
    return JSON.stringify([]);
  }
}

function parser(links, url) {
  return links.filter(link => {return link.toLowerCase().includes(url.toLowerCase())})
}
// function genericParser() {
//   // Just the base web url ie https://inc.com/
// }

function twitterParser(data) {
  // All articles -not- from twitter
  if (JSON.parse(data).objects) {
    var parsed = JSON.parse(data);
    var links = parsed.objects[0].links
    var filtered = links.filter(link => {
      console.log(!link.toLowerCase().includes("twitter.com"));
      return !link.toLowerCase().includes("twitter.com")
    })
    return JSON.stringify(filtered)
  } else {
    return JSON.stringify([])
  }
}

// function dashParser() {
//   // Find base url + first-last ie : https://inc.com/larry-kim
// }

// function smashParser() {
//   // Find base url + firstlast ie : https://inc.com/larrykim
// }


module.exports = router;
