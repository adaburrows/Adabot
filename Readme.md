ADABOT
======

Adabot is a distributed IRC bot/client.

What it Does
------------

The main IRC client starts passing messages to and from IRC via ØMQ. There are a few things missing, like being able to join channels, quit channels, change mode, change nick, etc. -- all of which are provided by the IRC library. Please fork it and start sending me pull requests. Or, just send me feature requests.

The DB client just simply listens to all messages and writes them to the DB.

The PM client listens for PMs and replies to them with a greeting.

I've made it easy to start writing code that interacts with IRC by writing a worker. Require irc_worker.js, create a new irc_worker object, and override the objects process method. Just examine db_worker.js and pm_worker.js to get started.

Eventually it will feature a web IRC client based on socket.io and express.

How to use
----------

 * Set up all the requirements.
 * Copy config.js.template to config.js and change the settings.
 * Use Forever to daemonize the worker scripts: db_worker.js, pm_worker.js and whatever scripts you write -- then daemonize irc_client.js.

Requirements
------------

 * irc -- npm install irc
 * zeromq -- npm install zeromq
 * cradle -- npm install cradle

