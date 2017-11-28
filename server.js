process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.UV_THREADPOOL_SIZE = 32;

var app = require('./config/express');

var http = require('http');
var https = require("https");

var server = http.createServer(app);
var port = 3000;
//var mongo = config.mongo.connectionString;

server.listen(port, function () {
    console.log('Server running at port : ' + port);
    console.log('success');
}).on('error', function (err) {
    if (err.errno === 'EADDRINUSE') {
        console.log('port busy');
    } else {
        console.log(err);
    }
});