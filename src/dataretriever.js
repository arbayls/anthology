import Diffbot from 'diffbot-node-client'

function DataRetriever() {
  this.data = [];
  this.loaded = [];
  this.numReceived = 0;
}

DataRetriever.prototype.load = function(url, callback, data) {
  this.loaded.push({url: url, callback: callback, data: data});
}

DataRetriever.prototype.getLoaded = function() {
  var self = this;
  for (var i = 0; i < self.loaded.length; i++) {
    self.getResponses(self.loaded[i])
  }
}

DataRetriever.prototype.getResponses = function(data) {
  var self = this;
  var client = new Diffbot("29e49e8b36b2d63c2cf3ed4cf26e584b")
  client.article.get({
    url: data.url
    }, function onSuccess(response) {
        var cb = data.callback.bind(self);
        cb(JSON.parse(response), data.data)
    }, function onError(response) {
        console.log(JSON.parse(response));
    })
}

DataRetriever.prototype.rejoin = function(data) {
  this.data.push(data);
  this.numReceived++;
  if (this.numReceived === this.loaded.length) {
    console.log("YIPPEE!");
    console.log(this.data);
    cardMaker(this.data)
  }
}

function cardMaker (data) {
  var cards = document.querySelector("#results");
  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
      console.log(data[i][j]);
      var card = document.createElement("a")
      card.href = data[i][j];
      card.className = "embedly-card"
      card["data-card-key"]= "82db3e7ef863409080c2999dbf364c86"
      card.style.display="inline-block"
      cards.appendChild(card);
    }
  }
  console.log(cards);
}

export {DataRetriever};
