/*
 * PM Worker
 * ---------
 * Receives messages from IRC via 0mq.
 * Sends a greeting back to any PMs.
 * =============================================================================
 */

// Load required modules
var irc_worker = require('./irc_worker.js');

// Create a new irc_worker called pm_worker
var pm_worker = new irc_worker();

pm_worker.process = function(message_data){
  if(message_data.to == this.config.irc_nick) {
    this.publisher.send(JSON.stringify({
      "to": message_data.from,
      "from": this.config.irc_nick,
      "message": "Hi "+message_data.from+"!"
    }));
  }
};
