var express = require('express'),
        morgan = require('morgan'),
        compress = require('compression'),
        bodyParser = require('body-parser'),
        methodOverride = require('method-override'),
        path = require('path');

var db = require('../db.js');

var config = require('./config');
var mongo = config.mongo.connectionString;

var safariRoutes = require("../app/routes/safari");
var tokenRoutes = require('../app/routes/tokens');

var chromePush = require('../app/routes/chrome');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../app/views'));

app.use(function(req, res, next) {
//  var allowedOrigins = ['https://push-server.langgame.net', 'https://connect.langgame.net', 'http://hkgh.mobo.vn'];
//  var origin = req.headers.origin;
//  if(allowedOrigins.indexOf(origin) > -1){
//       res.setHeader('Access-Control-Allow-Origin', origin);
//  }
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
}

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static('public'));

db.connect(mongo, function (err) {
    if (!err) {
        app.set('db', db.get());
        return;
    }
    console.log('Unable to connect to Mongo.')
    process.exit(1);
});


//var MongoStream = require('mongo-triggers');
//
//var watcher = new MongoStream({format: 'pretty'});
//
//// watch the collection
//watcher.watch('push_notification_safari.pushtoken', function(event) {
//  // parse the results
//  console.log('something changed:', event);
//});

safariRoutes(app), tokenRoutes(app), chromePush(app); 

module.exports = app;
