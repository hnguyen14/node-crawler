var _ = require('underscore')._;
var request = require('request');
var cheerio = require('cheerio');
var htmlParser = require('./htmlParser');

function Crawler(options) {
  this.init(options)
}

Crawler.prototype.init = function(options) {
  var defaultOption = {
    option1: 'default',
    callback: function(error, response, body) {
      console.log('done');
      var htmlData = htmlParser.parse(response.request.uri.href, body);
      console.log(htmlData.title);
      console.log(htmlData.links.length);
    }
  }

  this.options = _.extend({}, defaultOption, options);
  this._queue = [];
  setInterval(this._crawl.bind(this), 1000);
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
