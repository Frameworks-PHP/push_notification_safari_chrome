var express = require('express');
var path = require('path');
var pushSafari = require('../controllers/safari-push/safari-client');
var domain = require('../controllers/domain');
var history = require('../controllers/history');
var savePushToken = require('../controllers/savePushToken');
var saveNewSite = require('../controllers/saveNewSite');
var mongodb = require('mongodb');

var icon = require('../controllers/icon');
var file = require('../controllers/file');
var multer = require('multer');
var upload = multer({dest: 'upload/'});
var upload_file = multer({dest: 'upload_file/'});

//var events = require('events');
//var MongoOplog = require('mongo-oplog');
//    
//var options = { 
//  database: 'local'
//};
//
//var oplog = MongoOplog('mongodb://127.0.0.1:27017', 'push_notification_safari.pushtoken');
////var oplog = MongoOplog('mongodb://127.0.0.1:27017/local');
//
//oplog.tail();
//oplog.on('insert', doc => {
//    console.log("doc doc doc");
//    console.log(doc);
//});

module.exports = function (app) {

    app.route('/')
            .get(function (req, res, next) {
                res.render('pages/index');
//                res.sendFile(path.resolve('app/views/toolPushNotification.html'));
            });
    app.route('/index')
            .get(function (req, res, next) {
                res.render('pages/index');
            });
    app.route('/history')
            .get(function (req, res, next) {
                res.render('pages/history');
            });
    app.route('/history_demo')
            .get(function (req, res, next) {
                res.render('pages/history_demo');
            });
    app.route('/create_site')
            .get(function (req, res, next) {
                res.render('pages/create_site');
            });

    app.route('/uploadcert')
            .post(upload.single('file'), file.uploadcert);
    app.route('/uploadIcon')
            .post(upload.single('file'), icon.uploadfunction);
    app.route('/api/domain')
            .get(domain.getdomain)
            .post(domain.getdomain);
    app.route('/:domain/push')
            .post(savePushToken.savePushToken)
            .get(savePushToken.savePushToken);
    app.route('/:domain/v1/push')
            .post(pushSafari.callBack)
            .get(pushSafari.callBack);
    app.route('/api/save_history')
            .post(history.save_history);
    app.route('/api/load_history')
            .get(history.load_history)
            .post(history.load_history);
    app.route('/api/saveNewSite')
            .post(saveNewSite.saveNewSite);
}

function sendNotification(req, res) {
}


