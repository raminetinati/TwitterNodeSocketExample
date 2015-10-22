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

T.get('search/tweets', { q: '#datascience', count: 100 }, function(err, data, response) {
  //console.log(data)
});

//var stream = T.stream('statuses/filter', { track: ['webwewantfest', 'webwewant', 'webweshare'] });
//var stream = T.stream('statuses/filter', { track: ['twitpic', 'http://img', 'img'] });
var stream = T.stream('statuses/sample');



// io.on('connection', function (socket) {
//      io.emit('tweets', { hello: 'world' });
// });

console.log("Emitting Tweets");


stream.on('tweet', function (tweet) {
    //console.log(tweet);
    //emitMsg('tweets', tweet);
    
    //Here we can do some pre-processing of the data to ensure that the tweet is formatted correctly, etc
    tweet = preProcessData(tweet);
    io.emit('tweets',tweet);
        
        
        
});

//In this function we want to do some pre-processing of the incomming data stream
function preProcessData(tweet) {
    var = dataParsed = false;
    var minTweetCharLen = 10;
    //How about a simple check for the length of the tweet
    if((tweet.text).length > minTweetCharLen){
        console.log('pre-processing info: Tweet Length is:'+ (tweet.text).length);
        
        //we're now happy, if so, let's make it to send the tweet off
        dataParsed = true;
    }
    
    if(dataParsed){
        io.emit('tweets',tweet);
    }else{
        //Do something else,
        //If data is neeeded, then could let the front end know?
    }
      
}
