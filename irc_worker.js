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
  var json = data.toString();
  var message = JSON.parse(json);

  // Do processing, maybe reply using the publisher queue
  if(message.to == config.irc_nick) {
    publisher.send(JSON.stringify({
      "to": message.from,
      "from": config.irc_nick,
      "message": "Hi "+message.from+" !"
    }));
  }

});

// Connect the subscriber socket to the publisher
subscriber.connect("tcp://127.0.0.1:"+config.irc_client_pub);
