const Hapi = require('hapi');
const assert = require('assert');

const server = new Hapi.Server({
  host: 'localhost',
  port: 8000
});

server.route(require('./routes'));

server.start(function (err) {
  assert(!err); // halt startup if registering plugins fails
});

module.exports = server;
