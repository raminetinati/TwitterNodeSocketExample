TwitterNodeSocketExample
========================

An example application connecting to Twitter Streaming API, and then sending results to HTML page using socket.io

To Use
======

To run, run node app/TwitterServer.js

Note: You need to enter your Twitter Client credentials (public key, secret key, access token) in order to enable the stream to run.

Go to http://dev.twitter.com and create a new application.

Once you have obtained your credentials, edit the NodeServer.js file:

var T = new Twit({
    consumer_key:         'REQUIRED'
  , consumer_secret:      'REQUIRED'
  , access_token:         'REQUIRED'
  , access_token_secret:  'REQUIRED'
});

The 'REQUIRED' strings need to be repaced with your Twitter credentials.

For a live demo, go here: http://jxt0.ecs.soton.ac.uk/twitter


Dependencies
===========

This application requires the following Node Packages. P

*HTTP Server
*Node.JS 
*Socket.io
*Twit

To install these, please use the NPM (Node Package Manager).
