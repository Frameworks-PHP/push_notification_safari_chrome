//var configs = require(__dirname + '/configs/env/' + process.env.NODE_ENV);
var configs = require('../path_push');

var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');

var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var packageMaker = require(__dirname + '/package_maker');

exports.callBack = function (req, res, next) {
    if (req.url === '/') {
        res.sendFile(__dirname + "/index.html");
        //res.end();
        return;
    }
    if (req.url === '/client') {
        res.sendFile(__dirname + "/client.html");
        //res.end();
        return;
    }
    var commands = req.url.split("/");

    /*var cookieString = req.headers["cookie"];    
     var cookieArrays = cookieString.toString().split(";");    
     var cookies = [];
     for(var idx = 0; idx < cookieArrays.length; idx ++){
     var cookieSplits = cookieArrays[idx].split("=");
     cookies[cookieSplits[0]] = cookieSplits[1];
     }
     var pushId = cookies["pushid"];
     console.log(cookies);
     */

    //console.log('oke');
    //console.log(req.socket.remoteAddress + " : " + req.method + " " + req.url);

    if (commands[2] != 'v1') {
        res.writeHead(500);
        res.end();
        return;
    }

    var code = commands[3];


    // /v1/pushPackages/[websitePushID]
    if (code === "pushPackages") {


        var pushPackage = req.params["package"];
        var domain = req.body['hostname'];
        if (configs[pushPackage][domain] === undefined) {
            res.writeHead(500);
            res.end();
            return;
        }
        var info = configs[pushPackage][domain];
        var path = __dirname + '/' + info.path;
        var pathSignature = path + '/' + domain + '/' + info.signature + ".zip";

        console.log("check fs.existsSync PathSignature");
        console.log(fs.existsSync(pathSignature));
        if (fs.existsSync(pathSignature) === false) {
            packageMaker.createPackage(res, path, pushPackage, domain);
        } else {
            fs.readFile(pathSignature, function (error, data) {
                if (!error) {
                    res.writeHead(200, {'Content-Type': 'application/zip'});
                    res.end(data);
                } else {
                    res.writeHead(500);
                    res.end();
                }
            });
        }
        return;
    }

    // /v1/log
    if (code === "log") {
        console.log(req.body);
        res.writeHead(200);
        res.end();
        return;
    }

    // /v1/devices/[deviceToken]/registrations/[websitePushID]
    if (code === "devices" && commands[5] === "registrations") {
//        var deviceToken = commands[4],
//            websitePushID = commands[6];
//            domain = commands[2];
        var deviceToken = req.params["deviceToken"];
        var websitePushID = req.params["websitePushID"];
        var domain = req.params["domain"];

        var db = req.app.get('db');
        var collection = db.collection('token');

        if (req.method == 'POST') {

            var subscribeData = {
                deviceToken: deviceToken,
                websitePushID: websitePushID,
                platform: 'safari'
            };

            //check site exists or not.
            var collectionSite = db.collection('site');
            function checkDomainExists() {
                collectionSite.find({
                    site: (domain)
                }, {
                    _id: 1,
                    site: 1
                }).toArray(checkDomain);
            }

            var checkDomain = function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    subscribeData.domain = {
                        _id: (result[0] || {})._id,
                        site: (result[0] || {}).site
                    };
                    insertDocument(collection, function (err, data) {}, subscribeData);
                } else {
                    //create new site
                    collectionSite.insertOne({site: domain, webpushid: websitePushID});
                    checkDomainExists();
                }
            }

            // Todo: add deviceToken into pushfarm database

            var insertDocument = function (db, callback, datainsert) {
                db.insertOne(datainsert, function (err, result) {
                    callback(result);
                });
            }

            checkDomainExists();


        } else if (req.method == 'DELETE') {

            var subscribeData = {
                deviceToken: deviceToken,
                websitePushID: websitePushID,
                platform: 'safari'
            };

            var collectionSite = db.collection('site');
            function deleteToken() {
                collectionSite.find({
                    site: (domain)
                }, {
                    _id: 1,
                    site: 1
                }).toArray(findDomain);
            }

            var findDomain = function (err, result) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    subscribeData.domain = {
                        _id: (result[0] || {})._id,
                        site: (result[0] || {}).site
                    };

                    removeDocument(collection, function () {});
                }
            }
            // Todo: delete deviceToken from pushfarm database
            var removeDocument = function (db, callback) {
                db.deleteOne(subscribeData, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                });
            }

            deleteToken();

        }

        res.writeHead(200);
        res.end();
        return;
    }
    if (code == "push") {

        domainId = req.body.domain;
        var db = req.app.get('db');
        var collection = db.collection('token');
        var o_id = new mongodb.ObjectID(domainId);

        collection.find({
            "domain._id": (o_id)
        }).toArray(
                function (err, result) {
                    if (err) {
                        response = {
                            message: 'No sites!',
                            code: false
                        };
                        res.end(JSON.stringify(response));
                    }
                    else if (result.length == 0) {
                        response = {
                            message: 'Nobody allow this site',
                            code: false
                        };
                        res.end(JSON.stringify(response));
                    }
                    else {
                        result.map(function (item, i) {
    //                        var domain = item.domain.map(function (item2, i2){
    //                            console.log(item2);
    //                            return domain = item2.site;
    //                            
    //                        });
                            var domain = item.domain.site;
                            var pushPackage = item.websitePushID;
                            var deviceToken = item.deviceToken;
                            push(pushPackage, domain, deviceToken);

                        });
                                            response = {
                        message: 'Success push',
                        code: true
                    };
                    res.end(JSON.stringify(response));
                    }

                }
        );


        function push(pushPackage, domain, deviceToken) {

//            var pushPackage = req.params["package"];
//            var domain = req.boby['hostname'];
            console.log(configs[pushPackage][domain]);
            if (configs[pushPackage][domain] === undefined) {
                res.writeHead(500);
                res.end();
                return;
            }
            var info = configs[pushPackage][domain];
            //var path = + '/' + info.path + '/' + pushPackage + '/' + info.certPush;


//            var deviceToken = req.params["token"];

            var title = req.body["title"],
                    body = req.body["body"],
                    button = req.body["button-label"],
                    urlargs = [req.body["path-redirect"]];

            var alert = {
                "title": title,
                "body": body,
                "action": button
            };

            var join = require('path').join
                    , pfx = join(__dirname, '/' + info.path + '/' + info.certPush);

            //console.log(urlargs);
            // Create a new agent
            var apnagent = require('./apnagent')
                    , agent = module.exports = new apnagent.Agent()
                    , device = module.exports = new apnagent.Device();

            // set our credentials
            agent.set('pfxfile', pfx);


            agent.connect(function (err) {
                // gracefully handle auth problems
                if (err && err.name === 'GatewayAuthorizationError') {
                    console.log('Authentication Error: %s', err.message);
                    process.exit(1);
                }

                // handle any other err (not likely)
                else if (err) {
                    console.log(err);
                    //throw err;
                }

                // it worked!
                var env = agent.enabled('sandbox')
                        ? 'sandbox'
                        : 'production';

                console.log('apnagent [%s] gateway connected', env);

            });
            //query db
            device.setDeviceToken(deviceToken);

            agent.createMessage()
                    .device(device)
                    .apsAppend('alert', alert)
                    .apsAppend('url-args', urlargs)
                    .send();

            agent.stop();

//            res.writeHead(200);
//            res.end();
            return true;
        }
    }
    res.end();
}