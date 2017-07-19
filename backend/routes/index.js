let express = require('express');
let router = express.Router();
let Diffbot = require('diffbot-node-client');
let Bing = require('node-bing-api')({ accKey: "f13f5a60955b4e35b071e14eea9a4057" });
let client = new Diffbot("59614fe60c56f7800045670876d8c878");
let DataRetriever = require('../public/javascripts/dataretriever.js');


// Bing.web(`site:businessinsider.com "Larry%20Kim"`, {
//   count: 1
// }, function(error, res, body) {
//   console.log(error);
//   console.log(body.webPages.value[0].displayUrl);
//   var url = body.webPages.value[0].displayUrl;
//   if (!url.includes("https://")) {
//     if (!url.includes("http://")) {
//       url = "https://" + url;
//     }
//   }
//   var Diffbot = require('diffbot-node-client');
//   var client = new Diffbot("59614fe60c56f7800045670876d8c878");
//
//   client.article.get({
//     url: url
//   }, function onSuccess(data) {
//         // var links = JSON.parse(data).objects[0].links.filter(link => {return link.includes('https://twitter.com/larrykim/status')})
//         // for (var i = 0; i < links.length; i++) {
//         //   console.log(links[i]);
//         // }
//         console.log(JSON.parse(data).objects);
//     }, function onError(data) {
//       console.log(data.data);
//     })
// })

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

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
        console.log("SUCCCCCCSSSEEEzZZZ");
          res.json(data)
      }, function onError(data) {
        console.log("L:OOOOOOOOSEZER");
          res.json(data);
      })
  })

})

function dataGetter (req, res) {


  var retriever = new DataRetriever();

  retriever.getLoaded(res);
}

function incParser(response, author, res) {
  var parsedData = response;
  if (parsedData.objects) {
    var allIncArticles = parsedData.objects[0].links;
    var incAuthorArticles = allIncArticles.filter(function(article) {
      return article.includes("www.inc.com/" + author.firstName + "-" + author.lastName);
    })
    this.rejoin(incAuthorArticles, res);
  } else {
    this.rejoin([], res);
    }
}

//Parses data received from business insider and returns array of http addresses written by freelancer
function businessInsiderParser(response, author, res) {
  var parsedData = response;

  if (parsedData.objects) {
    var allBusinessInsiderArticles = parsedData.objects[0].links;
    var businessInsiderAuthorArticles = allBusinessInsiderArticles.filter(function(article) {
      return article.includes("www.businessinsider.com/");
    })
    this.rejoin(businessInsiderAuthorArticles, res)
  } else {
    this.rejoin([], res);
    }
}

  function clearvoiceParser(response, author, res) {
    var parsedData = response;
    if (parsedData.objects) {
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
      this.rejoin(clearvoiceAuthorArticles, res)
    } else {
      this.rejoin([], res);
      }
}

function twitterParser(response, twitterHandle, res) {
//add twitter stuff here...
  var parsedData = response;
  if (parsedData.objects) {
    var tweets = response.objects[0].links.filter(tweet => {return tweet.includes(`https://twitter.com/${twitterHandle.handle}/status`)});
    this.rejoin(tweets, res);
  } else {
    this.rejoin([], res);
  }
}

module.exports = router;
