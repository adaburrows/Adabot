var config = require('./config.js');

var context = require('zeromq');
var subscriber = context.createSocket('sub');

var cradle = require('cradle');
var db = new(cradle.Connection)().database('irc_messages');

subscriber.subscribe("");
subscriber.on('message', function (data) {
  var json = data.toString()
  var message = JSON.parse(json)
  db.save(message, function(err, res){
    console.log(err+': '+res);
  });
});

subscriber.connect("tcp://127.0.0.1:"+config.irc_client_pub);
