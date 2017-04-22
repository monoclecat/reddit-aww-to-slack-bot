// Require module:

var MY_SLACK_WEBHOOK_URL = 'slack-web-hook-url';
var slack = require('slack-notify')(MY_SLACK_WEBHOOK_URL);

const cheerio = require('cheerio');

var request = require('request');
request('https://www.reddit.com/r/aww/top/?sort=top&t=day', function (error, response, body) {
  //console.log('error:', error); // Print the error if one occurred
  //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body);
  const $ = cheerio.load(body);

  var subreddit_name = $('#siteTable').children().first().data('subreddit');
  var img_url = $('#siteTable').children().first().data('url');

  slack.send({
    channel: '#random',
    icon_url: 'http://www.clker.com/cliparts/g/w/U/u/f/D/black-pet-paw-hi.png',
    text: 'Cute animal of the day: ' + img_url,
    unfurl_links: 1,
    username: 'reddit.com/r/' + subreddit_name,
  });
});
