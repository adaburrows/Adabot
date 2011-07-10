/*
 * IRC Worker
 * ----------
 * Receives messages from via 0mq, processes them and maybe sends a response
 * =============================================================================
 */

function irc_worker () {
  var config, context, subscriber, publisher;

  // Load config
  this.config = require('./config.js');

  // Create 0mq context
  this.context = require('zeromq');
  // Create a subscriber socket for the 0mq
  this.subscriber = this.context.createSocket('sub');
  this.subscriber.subscribe("");
  // Create the 0mq publisher socket
  this.publisher = this.context.createSocket('push');
  this.publisher.connect("tcp://127.0.0.1:"+this.config.irc_client_sub);

  // Set up listening closure
  var self = this;
  this.subscriber.on('message', function (data) {
    // Convert to usable form
    var message_json = data.toString();
    var message_data = JSON.parse(message_json);
    // Send it to the processing function.
    self.process(message_data);
  });

  // Connect the subscriber socket to the publisher
  this.subscriber.connect("tcp://127.0.0.1:"+this.config.irc_client_pub);
}

// Processing function: Override this method to implement your worker
irc_worker.prototype.process = function (message_data) {
  // Do processing, maybe reply using the publisher queue
};

module.exports = irc_worker;
