var express = require('express');
var router = express.Router();
var Diffbot = require('diffbot-node-client');
var Bing = require('node-bing-api')({ accKey: "f13f5a60955b4e35b071e14eea9a4057" });
var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b");


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.post('/articles', function(req, res, next) {
  console.log(req.body);
  var bingRequest = `site:${req.body.site} "${req.body.firstName}%20${req.body.lastName}"`;
  console.log(bingRequest);
  var test = `site:inc.com "larry%20kim"`

  Bing.web(test, {
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
    var url = body.webPages.value[0].displayUrl
    console.log(url);
    client.article.get({
      url: url
    }, function onSuccess(data) {
          res.json(data)
      }, function onError(data) {
          res.json(data);
      })
  })

})

module.exports = router;
