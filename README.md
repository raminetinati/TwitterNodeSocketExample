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






