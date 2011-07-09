/*
 * IRC Worker
 * ----------
 * Receives messages from via 0mq, processes them and maybe sends a response
 * =============================================================================
 */

// Load config
var config = require('./config.js');

// Load required modules
var context = require('zeromq');

// Create a subscriber socket for the 0mq
var subscriber = context.createSocket('sub');
subscriber.subscribe("");

// Create the 0mq publisher socket
var publisher = context.createSocket('push');
publisher.connect("tcp://127.0.0.1:"+config.irc_client_sub);

// When we recieve a message from the 0mq
subscriber.on('message', function (data) {
  var json = data.toString()
  var message = JSON.parse(json)
  message.created = new Date();
  db.save(message, function(err, res){
    console.log(err+': '+res);
  });
});

// Connect the subscriber socket to the publisher
subscriber.connect("tcp://127.0.0.1:"+config.irc_client_pub);

// Send Jill a pm
publisher.send(JSON.stringify({
  "to": "PsyWren",
  "from": config.irc_nick,
  "message": "Hi Jill!
}));
