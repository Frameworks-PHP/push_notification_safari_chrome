var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');
var webpush = require('web-push');

exports.pushChrome = function (req, res) {
    console.log(req.body);
    var keys = require('../views/admin_chrome/gcm.json');
    var site = req.params.domain || req.body.domain; // group endpoints
    if (!site)
        return res.status(201).json({
            error: "No such site!",
            message:'No such site!',
            success: false
        });

    //	var data = req.body.data || '';
    var dateNow = getdate();
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    var data = {
        title: req.body.title,
        body: req.body.body,
        icon: req.body.icon,
        image: req.body.image,
        url: req.body.url,
        date: date,
        sitename: req.body.domain_name,
    }

    var payload = JSON.stringify({
        'title': req.body.title,
        'icon': req.body.icon,
        'image': req.body.image,
        'body': req.body.body,
        'data': {
            'url': req.body.url,
        }
    });
    var options = {
        vapidDetails: {
            subject: req.body.url || 'http://google.com',
            publicKey: keys.publicKey,
            privateKey: keys.privateKey
        }
    };

    var db = req.app.get('db');
    var collection = db.collection('endpoint');
    var o_id = new mongodb.ObjectID(site);
    collection.find({
        "domain._id": (o_id)
    }).toArray(
            function (err, result) {
                if (err || result.length == 0)
                    return res.status(201).json({
                        error: err,
                        message:'Fail send notification. Nomore user allow this site.',
                        success: false
                    });
                result.map(function (item, i) {
                    var subscription = {
                        endpoint: item.endpoint,
                        TTL: req.body.ttl,
                        keys: {
                            p256dh: item.token,
                            auth: item.auth
                        }
                    }
                    console.log(subscription);

                    setTimeout(function () {
                        webpush.sendNotification(subscription, payload, options);
                    }, req.body.delay * 1000);
                });

                data.site = (result[0] || {})._id;
                var insertDocument = function (db, callback) {
                    db.collection('history_send_chrome').insertOne(data, function (err, result) {
                        callback(err, result.ops);
                    });
                }
                insertDocument(db, function (err, data) {
                    if (err)
                        res.status(204).json({
                            error: err.message,
                            message:err.message,
                            success: false
                        });
                    else {
                        res.status(200).json({
                            result: data,
                            message:"Push success.",
                            success: true
                        });
                        console.log('true')
                    }
                });
            }
    );
}

function getdate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    if (hour.toString().length == 1) {
        var hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        var minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        var second = '0' + second;
    }

    today = mm + '/' + dd + '/' + yyyy + ' ' + hour + ':' + minute + ':' + second;
    return today;
}

var subscriptions = [];

exports.register = function (req, res) {
    
    console.log(req.body);
    console.log(req.param);
//    var endpoint = {
//        endpoint: req.body.endpoint,
//        token: req.body.keys.p256dh,
//        auth: req.body.keys.auth
//    }
//
//    if (!isSubscribed(req.body.endpoint)) {
//
//        var db = req.app.get('db');
//        var collection = db.collection('site');
//        collection.find({
//            site: (req.body.site)
//        }, {
//            _id: 1,
//            site: 1
//        }).toArray(
//                function (err, result) {
//                    if (err) {
//                        console.log(err);
//                    } else if (result.length) {
//
//                        endpoint.domain = {
//                            _id: (result[0] || {})._id,
//                            site: (result[0] || {}).site
//                        };
//                        if (!endpoint.domain)
//                            return res.status(204).json({
//                                error: "No site existed",
//                                success: false
//                            });
//
//                        var insertDocument = function (db, callback) {
//                            db.collection('endpoint').insertOne(endpoint, function (err, result) {
//                                callback();
//                            });
//                        }
//                        insertDocument(db, function (err, data) {
//                            if (err)
//                                res.status(204).json({
//                                    error: err.message,
//                                    success: false
//                                });
//                            else {
//                                res.status(200).json({
//                                    success: true
//                                });
//                                console.log('true')
//                            }
//                        });
//                    } else {
//                        console.log(result);
//                        console.log('No document(s) found with defined "find" criteria!');
//                    }
//                }
//        );
//        subscriptions.push(req.body.endpoint);
//    }
}

exports.unregister = function (req, res) {
    var endpoint = {
        endpoint: req.body.endpoint,
        token: req.body.keys.p256dh,
        auth: req.body.keys.auth
    }
    if (isSubscribed(req.body.endpoint)) {

        var db = req.app.get('db');
        var collection = db.collection('site');
        collection.find({
            site: (req.body.site)
        }, {
            _id: 1
        }).toArray(
                function (err, result) {
                    if (err) {
                        console.log(err);
                    } else if (result.length) {
                        endpoint.site = (result[0] || {})._id;
                        if (!endpoint.site)
                            return res.status(204).json({
                                error: "No site existed",
                                success: false
                            });
                        var removeDocument = function (db, callback) {
                            db.collection('endpoint').deleteOne({
                                endpoint: req.body.endpoint
                            }, function (err, result) {
                                console.log("Removed the document with the field endpoint");
                                callback(result);
                            });
                        }
                        removeDocument(db, function () {
                            if (err)
                                res.status(204).json({
                                    error: err.message,
                                    success: false
                                });
                            else {
                                res.status(200).json({
                                    success: true
                                });
                                console.log('true')
                            }
                        });

                    } else {
                        console.log('No document(s) found with defined "delete" criteria!');
                    }
                }
        );

        subscriptions.splice(subscriptions.indexOf(endpoint), 1);
    }
}

function isSubscribed(endpoint) {
    console.log(subscriptions);
    return (subscriptions.indexOf(endpoint) >= 0);
}
