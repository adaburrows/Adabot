/*
 * IRC Client
 * ----------
 * Receives messages from IRC and publishes them via 0mq
 * =============================================================================
 */

// Load config
var config = require('./config.js');

// Load required modules
var context = require('zeromq');
var irc = require('irc');

// Create the 0mq publisher socket
var publisher = context.createSocket('pub');
publisher.bindSync("tcp://127.0.0.1:"+config.irc_client_pub);

// Create the 0mq socket for all send requests
var receiver = context.createSocket('pull');
receiver.bindSync("tcp://127.0.0.1:"+config.irc_client_sub);

// Create the IRC client
var adabot = new irc.Client(config.irc_host, config.irc_nick, {
    channels: config.irc_channels,
    userName: config.irc_username,
    realName: config.irc_realname
});

// Listen for messages and publish them to the 0mq
adabot.addListener('message', function (from, to, message) {
    var data = {
      "from":from,
      "to":to,
      "message":message,
      "created":new Date()
    };
    var publish = JSON.stringify(data);
    publisher.send(publish);
});

// Listen for messages to send from the 0mq
receiver.on('message', function(data) {
  var json = data.toString();
  var message = JSON.parse(json);
  adabot.say(message.to, message.message);
});
