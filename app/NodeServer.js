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

//###################################
//If you want to use the search API (REST) then you can use this! line below, 
//In order to get data, you need to periodically pull data. Create an interval timer!
// T.get('search/tweets', { q: '#datascience', count: 100 }, function(err, data, response) {
//   //console.log(data)
// });


//######################
//Here you can either use a random sample, or search for something specific!
//var stream = T.stream('statuses/sample');
var stream = T.stream('statuses/filter', { track: ['datascience', 'data', 'data science'] });
//var stream = T.stream('statuses/filter', { track: ['twitpic', 'http://img', 'img'] });

//##############################
//this is just a test socket, but you could use this to get data as ell...!
// io.on('connection', function (socket) {
//      io.emit('tweets', { hello: 'world' });
// });



console.log("INFO: Got to the point where stream is about to emit to tweets");

stream.on('tweet', function (tweet) {
  //console.log(tweet);
// emitMsg('tweets', tweet);
    	preProcessData(tweet);
   		 //io.emit('tweets',tweet);
        //io.emit('tweets',tweet);
});


//In this function we want to do some pre-processing of the incomming data stream
function preProcessData(tweet) {
    var dataParsed = false;
    var minTweetCharLen = 10;
    //How about a simple check for the length of the tweet
    if((tweet.text).length > minTweetCharLen){
        console.log('pre-processing info: Tweet Length is:'+ (tweet.text).length);
        
        //we're now happy, if so, let's make it to send the tweet off
        dataParsed = true;
    }else{
    	//console.log('Did not meet requirement')
    }
    
    if(dataParsed){
        io.emit('tweets',tweet);
    }else{
        //Do something else,
        //If data is neeeded, then could let the front end know?
    }
      
}


//--------------Branch: MongoDB-Version
//Here we are going to be playing with MongoDB.
//We will look at saving and querying data.

//first, import the necessary package
var mongoose = require('mongoose');

//set up the database connection. 
//***NOTE: YOU NEED TO SET THE USERNAME/PASSWORD, HOSTNAME AND DATABASENAME***
mongoose.connect('mongodb://username:password@hostname/databaseName');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("connected to database");
});

//And we create a Schema for our new collection
var tweetDoc = new mongoose.Schema({
  source: String,
  status: String,
});






