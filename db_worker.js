/*
 * DB Worker
 * ---------
 * Receives messages from IRC via ØMQ.
 * Saves them to CouchDB.
 * =============================================================================
 */

// Load required modules
var cradle = require('cradle');
var irc_worker = require('./irc_worker.js');

// Connect to the CouchDB on database 'irc_messages'
var db = new(cradle.Connection)().database('irc_messages');
// Create a new irc_worker called db_worker
var db_worker = new irc_worker();

// When we recieve a message from the ØMQ
db_worker.process = function (message_data) {
  db.save(message_data, function(err, res){});
};
