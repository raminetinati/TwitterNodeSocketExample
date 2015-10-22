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

Go to http://dev.twitter.com and create a new application.

Once you have obtained your credentials, edit the NodeServer.js file:

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

You need to edit the client javascript file in order point to the server address. Navigate to your Git repository and edit the file by:

```
vi client/js/index.js
```

Now replace the following like with your server address:

```
    var socket = io.connect('http://ServerAddress:9001');
```

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

