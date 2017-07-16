let express = require('express');
let router = express.Router();
let Diffbot = require('diffbot-node-client');
let Bing = require('node-bing-api')({ accKey: "f13f5a60955b4e35b071e14eea9a4057" });
let client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b");
let DataRetriever = require('../public/javascripts/dataretriever.js');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/articles', function(req, res, next) {
  // var bingRequest = `site:${req.body.site} "${req.body.firstName}%20${req.body.lastName}"`;

  // Bing.web(bingRequest, {
  //   count: 1
  // }, function(error, result, body) {
  //   if (error !== null) {
  //     res.json(error);
  //     return;
  //   }
  //   if (!body.webPages) {
  //     res.json(body);
  //     return;
  //   }
    // var url = body.webPages.value[0].displayUrl;

    dataGetter(req, res);

    // client.article.get({
    //   url: "https://twitter.com/larrykim"
    // }, function onSuccess(data) {
    //     console.log("SUCCCCCCSSSEEEzZZZ");
    //       res.json(data)
    //   }, function onError(data) {
    //     console.log("L:OOOOOOOOSEZER");
    //       res.json(data);
    //   })
  // })

})

function dataGetter (req, res) {
  var author = req.body.author;
  var firstName = author.split(' ')[0];
  var lastName = author.split(' ')[author.split(" ").length - 1] || '';
  var twitterHandle = req.body.handle;
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

  var twitterObj = {
    handle: twitterHandle
  }

  var retriever = new DataRetriever();
  retriever.load(incMag, incParser, incObj);
  retriever.load(businessInsider, businessInsiderParser, businessInsiderObj);
  retriever.load(clearvoice, clearvoiceParser, clearvoiceObj);
  retriever.load(twitter, twitterParser, twitterObj)
  retriever.getLoaded(res);
}

function incParser(response, author, res) {
  var parsedData = response;
  var allIncArticles = parsedData.objects[0].links;
  var incAuthorArticles = allIncArticles.filter(function(article) {
    return article.includes("www.inc.com/" + author.firstName + "-" + author.lastName);
  })
  this.rejoin(incAuthorArticles, res);
}

//Parses data received from business insider and returns array of http addresses written by freelancer
function businessInsiderParser(response, author, res) {
  var parsedData = response;
  console.log(parsedData);
  var allBusinessInsiderArticles = parsedData.objects[0].links;
  var businessInsiderAuthorArticles = allBusinessInsiderArticles.filter(function(article) {
    return article.includes("www.businessinsider.com/");
  })
  this.rejoin(businessInsiderAuthorArticles, res)
}

function clearvoiceParser(response, author, res) {
  var parsedData = response;
  console.log(parsedData);
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
}

function twitterParser(response, twitterHandle, res) {
//add twitter stuff here...
  var tweets = response.objects[0].links.filter(tweet => {return tweet.includes(`https://twitter.com/${twitterHandle.handle}/status`)});
  this.rejoin(tweets, res);
}

module.exports = router;
