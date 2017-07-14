var Bing = require('node-bing-api')({ accKey: "f13f5a60955b4e35b071e14eea9a4057" });

Bing.web(`site:businessinsider.com "larry%20kim"`, {
  count: 1
}, function(error, res, body) {
  console.log(error);
  console.log(body.webPages.value[0].displayUrl);
})
