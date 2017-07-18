let Diffbot = require('diffbot-node-client');

function DataRetriever() {
  this.data = [];
  this.loaded = [];
  this.numReceived = 0;
}

DataRetriever.prototype.load = function(url, callback, data) {
  this.loaded.push({url: url, callback: callback, data: data});
}

DataRetriever.prototype.getLoaded = function(res) {
  var self = this;
  for (var i = 0; i < self.loaded.length; i++) {
    self.getResponses(self.loaded[i], res)
  }
}

DataRetriever.prototype.getResponses = function(data, res) {
  console.log(data);
  var self = this;
  var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b")
  client.article.get({
    url: data.url
    }, function onSuccess(response) {
        var cb = data.callback.bind(self);
        cb(JSON.parse(response), data.data, res)
    }, function onError(response) {
        console.log(JSON.parse(response));
    })
}

DataRetriever.prototype.rejoin = function(data, res) {
  this.data.push(data);
  this.numReceived++;
  if (this.numReceived === this.loaded.length) {
    res.json(this.data)
  }
}


module.exports = DataRetriever;
