TwitterNodeSocketExample
========================

An example application connecting to Twitter Streaming API, and then sending results to HTML page using socket.io

To Use
===========

To run: use either `node` or `forever start` 

e.g.

```
node app/NodeServer.js
```

To Configure
===========

**Server**

Note: You need to enter your Twitter Client credentials (public key, secret key, access token) in order to enable the stream to run.

1. Go to http://dev.twitter.com and create a new application.

2. Once you have obtained your credentials, edit the NodeServer.js file:

```
var T = new Twit({
    consumer_key:         'REQUIRED'
  , consumer_secret:      'REQUIRED'
  , access_token:         'REQUIRED'
  , access_token_secret:  'REQUIRED'
});
```
The 'REQUIRED' variables need to be repaced with your Twitter credentials.

**Client**

You need to edit the client javascript file in order point to the server address. 

1. Navigate to your Git repository and edit the file by:

```
vi client/js/index.js
```

2. Replace the following like with your server address:

```
var socket = io.connect('http://ServerAddress:9001');
```

3. Now either copy the entire client folder into your `/var/www/` folder, or create a symbolic link to the `client/' folder

Live Demo
===========


For a live demo, go here: http://jxt0.ecs.soton.ac.uk/twitter


Dependencies
===========

**Server**

This node application requires the following Node Packages. 

* HTTP Server
* Node.JS 
* Socket.io
* Twit

To install these, please use the NPM (Node Package Manager). e.g.

```
sudo npm install -g socket.io
```

**Client**

In order to access the Web client, you need to install Apache2. In order to do this, please run the following as sudo:

```
sudo apt-get update
sudo apt-get install apache2
```




TO USE WITH MONGODB
==================

To use with MongoDB you need to install the `Node` package `mongoose`.

```
sudo npm install -g mongoose
```
Notes:

* if you're installing it on a Microsoft Azure VN, remove the flag `-g')
* For more information and documentation about mongoose, please see: http://mongoosejs.com/

*In the example provided in this , we are going to be working with the Twitter Stream JSON object. More details can be found here: https://dev.twitter.com/overview/api/tweets*

**Creating a new MongoDB user**

We want to create a new MongoDB user with readWrite access to the chosen database. First `SSH` into your server, then lets connect to MongoDB. Note: I'm assuming that you have an `admin` or `userAdmin` account and have `auth` enabled. if not please see: https://docs.mongodb.org/manual/reference/built-in-roles/#userAdminAnyDatabase

We need to first connect to MongoDB using our admin user:

```
mongo -u username -p password --authenticationDatabase admin
```

Then we can connect to the new database we want to use, and create a new user

```
use twitter
db.createUser(
    {
      user: "normalUser",
      pwd: "password12345",
      roles: [
              "readWrite"
	]
    }
)
```

We now have a user `normalUser` we can use to connect to the database `twitter`, with `readWrite` access to any collection.

**Setting up the Mongoose connection**

We need to import the `mongoose` package and then set up the database connect. If there is an error report it to the console, you'll probably want to know this

```
var mongoose = require('mongoose');
mongoose.connect('mongodb://username:password@hostname/databaseName');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    console.log("connected to database");
});
```

Next, we need to define the Document Object Schema that we'll be using for `mongoose`. This is important, as it will be the schema that we'll be loading and querying from the MongoStore.

```
var tweetDoc = new mongoose.Schema({
  source: String,
  status: String,
});
```

In our example, we want to create a Schema which contains a `source` field, and the `status` field. The `source` field will be used to indicate where the data was harvested from, and the `status` will be the Twitter status being harvested.

Finally, link the Schema to the `Mongoose` model

```
var Tweet = mongoose.model('tweets', tweetDoc); 
```

Ok, we're now good to go. We can start saving and querying the incoming data!

**Saving Incomming Twitter Data to MongoDB**

First we need to create a function which allows us to save data to the given collection:

```
function updateDatabaseWithTweets(data_rec, source_name){
    try{
        var data = data_rec.content;
  		
  		var doc = new Tweet({
  			source: source_name,
	    	status: data,
            });
            
        doc.save(function(err, doc) {
        if (err) return console.error(err);
        });
        //console.log("Added New Items: "+data);
	
    }catch(e){

    }
}

```

The function `updateDatabaseWithTweets(data_rec, source_name)`, takes in two parameters, the Twitter data, and the name of the source. Based on the `Tweet` Schema, we create a new Mongoose document `doc`, and populate it with the data from the functions parameters. We then call `doc.save()` in order to commit the new data!

We can now update the function `preProcessData(tweet)` and add the call to the `updateDatabaseWithTweets(data_rec, source_name)` function within the the following section

```
...
 if(dataParsed){
        io.emit('tweets',tweet);
        updateDatabaseWithTweets(tweet, "twitterHarvesterByRamine")
    }
...
```



**Retrieving Data from MongoDB Collection**

We also want to be able to retrieve data that we're storing. To do this we create a new function `loadDatabaseData()`. This function is going to be called when a user first connects to the application, so we're also going to pass it the `socket` as a parameter, so we can `emit` data when we get our data. 

```
function loadDatabaseData(socket){
    var response = [];
    Tweet.find(function (err, responses) {
        if (err) return console.error(err);
        //console.log(responses);
        try{
            //Dont want to sent too many responses
            socket.emit("historic_data", responses.slice((responses.length-5000), (responses.length-1)));
        }catch(e){
            //Looks like there isn't that many, a few will do!
     	    socket.emit("historic_data", responses);
        }
    })

}
```

The function performs a simple `find` operation on the `Tweet` object which we defined earlier. For richer querying capablity, please check out: http://mongoosejs.com/docs/queries.html

As we want to send this data to the client when they first connect, we're going to also define a new function using our `socket`, which waits to hear for a new user connecting.

```
io.on('connection', function (socket) {

     socket.on('load_data', function (data) {
        console.log("Loading New Application User");
        loadDatabaseData(socket);        
    });


});
```

Finally, we need to make sure that this is part of the client code. We need to edit the client's `index.js` file located in '/client/js`

```
socket.emit("load_data","");

socket.on('historic_data', function (databaseDump) {

    for(var i=0; i<databaseDump.length; i++){
        console.log(databaseDump[i].status)
    }
    
});
```

As soon as the client connects, we want them to call the `socket` to notify the server that we want some data using the `load_data` route. We also need to wait for the `historic_data` route, which will be used to recieve the database data from the server.






**TUTORIAL Tasks: Things to try**

* Improve the inserting of data so that it happens in batches, rather than one document at a time.
* Improve the loading function, perform a more richer query to return the URLs of the images within the status object.
* Once the data is with the client, we need to do something with it, rather than just see a pretty console of data....

