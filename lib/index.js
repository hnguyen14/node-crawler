var _ = require('underscore')._;
var request = require('request');


function Crawler(options) {
  this.init(options)
}

Crawler.prototype.init = function(options) {
  var defaultOption = {
    option1: 'default',
    callback: function(error, repsonse, body) {
      console.log('done', arguments);
    }
  }

  this.options = _.extend({}, defaultOption, options);
  this._queue = [];
  setInterval(this._crawl.bind(this), 1000);
}

Crawler.prototype.getOption = function(name) {
  return this.options[name];
}

Crawler.prototype._crawl = function() {
  if (!this._queue.length) {
    console.log('no url in queue');
    return;
  }
  var url = this._queue.shift();
  console.log('crawling', url, '...');
  request(url, this.options.callback);
}


Crawler.prototype.queue = function(url) {
  this._queue.push(url);
}


module.exports = Crawler;
