'use strict';

var mongoose = require('mongoose');

//var uri = "mongodb://admin:admin123@ds011288.mongolab.com:11288/salesman";
var uri = "mongodb://localhost:27017/syncSample";
var options = { seedDB: false, // Seed database on startup
                server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };
mongoose.connect(uri,options);


var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function() {
  console.log("database connected!")
});
// Populate databases with sample data
//if (options.seedDB) { require('./seed'); }

module.exports = mongoose;


