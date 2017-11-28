var express = require('express');
var path = require('path');
var pushSafari = require('../controllers/safari-push/safari-client');

module.exports = function (app) {

    app.route('/:domain/v1/pushPackages/:package')
            .post(pushSafari.callBack)
            .get(pushSafari.callBack);
    app.route('/:domain/v1/log')
            .post(pushSafari.callBack)
            .get(pushSafari.callBack);
    app.route('/:domain/v1/devices/:deviceToken/registrations/:websitePushID')
            .post(pushSafari.callBack)
            .get(pushSafari.callBack)
            .delete(pushSafari.callBack);
//    app.route('/v1/push/:package/:token')
//            .post(pushSafari.callBack)
//            .get(pushSafari.callBack);
    app.route('/client')
            .post(pushSafari.callBack)
            .get(pushSafari.callBack);

};