/*
 * IRC DB
 * ----------
 * Receives messages from via 0mq and saves them to CouchDB
 * =============================================================================
 */

// Load config
var config = require('./config.js');

// Load required modules
var context = require('zeromq');
var cradle = require('cradle');

// Create a subscriber socket for the 0mq
var subscriber = context.createSocket('sub');
subscriber.subscribe("");

// Connect to the CouchDB on database 'irc_messages'
var db = new(cradle.Connection)().database('irc_messages');

// When we recieve a message from the 0mq
subscriber.on('message', function (data) {
  var json = data.toString();
  var message = JSON.parse(json);
  db.save(message, function(err, res){
    console.log(err+': '+res);
  });
});

// Connect the subscriber socket to the publisher
subscriber.connect("tcp://127.0.0.1:"+config.irc_client_pub);
