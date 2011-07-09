var config = require('./config.js');
var context = require('zeromq');
var irc = require('irc');

var publisher = context.createSocket('pub');
publisher.bindSync("tcp://127.0.0.1:"+config.irc_client_pub);

var receiver = context.createSocket('sub');
receiver.subscribe("");

var adabot = new irc.Client(config.irc_host, config.irc_nick, {
    channels: config.irc_channels,
    userName: config.irc_username,
    realName: config.irc_realname
});

adabot.addListener('message', function (from, to, message) {
    var data = {
      "from":from,
      "to":to,
      "message":message
    };
    var publish = JSON.stringify(data);
    publisher.send(publish);
});

receiver.on('message', function(data) {
  var json = data.toString();
  var message = JSON.parse(json);
  adabot.say(message.to, message.message);
});

receiver.connect("tcp://127.0.0.1:"+config.irc_client_sub);
