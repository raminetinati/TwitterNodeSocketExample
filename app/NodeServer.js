var Twit = require('twit')
var app = require('http').createServer(handler);
var io = require('socket.io')(app);

app.listen(9001);

function handler (req, res) {
    res.writeHead(200);
    res.end("");
}

var T = new Twit({
    consumer_key:         'REQUIRED'
  , consumer_secret:      'REQUIRED'
  , access_token:         'REQUIRED'
  , access_token_secret:  'REQUIRED'
});

T.get('search/tweets', { q: '#webwewantfest', count: 100 }, function(err, data, response) {
  //console.log(data)
});

//var stream = T.stream('statuses/filter', { track: ['webwewantfest', 'webwewant', 'webweshare'] });
//var stream = T.stream('statuses/filter', { track: ['twitpic', 'http://img', 'img'] });
var stream = T.stream('statuses/sample');



io.on('connection', function (socket) {
     io.emit('tweets', { hello: 'world' });
});

console.log("Emitting Tweets");


stream.on('tweet', function (tweet) {
  //console.log(tweet);
// emitMsg('tweets', tweet);
        io.emit('tweets',tweet);
});
