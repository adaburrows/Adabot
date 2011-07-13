/*
 * Say
 * ---
 * Sends keyboard input to IRC.
 * =============================================================================
 */

// Load required modules
var irc_worker = require('./irc_worker.js');

// Create a new irc_worker called pm_worker
var say_worker = new irc_worker();

say_worker.say = function(message){
  this.publisher.send(JSON.stringify({
    "to": "#pdxwebdev",
    "from": this.config.irc_nick,
    "message": message
  }));
}

process.stdin.resume();
process.stdin.on("data", function(data) {
  say_worker.say(data.toString());
});
