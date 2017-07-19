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
          res.json(data)
      }, function onError(data) {
          res.json(data);
      })
  })

})
module.exports = router;
