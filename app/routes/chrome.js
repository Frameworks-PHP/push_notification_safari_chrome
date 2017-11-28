var express = require('express');
var path = require('path');

var pushChrome = require('../controllers/pushChrome');
var history = require('../controllers/history');

module.exports = function (app) {

    app.route('/chrome')
            .get(function (req, res, next) {
                res.render('admin_chrome/index');
            });
    app.route('/history_chrome')
            .get(function (req, res, next) {
                res.render('admin_chrome/history');
            });
    app.route('/chrome_client')
            .get(function (req, res, next) {
                res.sendFile(path.resolve('app/views/client_test/index.html'));
            });

    app.route('/api/pushChrome')
            .post(pushChrome.pushChrome);
    app.route('/api/load_history_chrome')
            .get(history.load_history_chrome)
            .post(history.load_history_chrome);
    app.route('/api/register')
            .post(pushChrome.register);
//            .options(pushChrome.register);
    app.route('/api/unregister')
            .post(pushChrome.unregister);


};


