var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');

exports.save_history = function (req, res) {
    console.log("save history");
    var db = req.app.get('db');
    var collection_site = db.collection('site');
    var o_id = new mongodb.ObjectID(req.body.domain);
    var collection_history = db.collection('history_send');
    var saveData = {
        websitePushID: req.body.webpushid,
        title: req.body.title,
        body: req.body.body,
        btnlabel: req.body["button-label"],
        path_redirect: req.body["path-redirect"]
    };
    //get now();
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    saveData.date_push = date;
    //select site in db with id = o_id
    collection_site.find({"_id": (o_id)}).toArray(
            function (err, result) {
                if (err) {
                    console.log(err);
                }
                saveData.domain = {
                    _id: (result[0] || {})._id,
                    site: (result[0] || {}).site
                };
                insertDocument(collection_history, function (err, data) {
                    //return client
                }, saveData);
            }
    );
    var insertDocument = function (db, callback, datasave) {
        db.insertOne(datasave, function (err, result) {
            if(err){console.log(err)}
            else{
                console.log("Inserted a document into the token collection.");
                response = {
                        message: 'Inserted a document into the token collection',
                        code:true
                    };
                res.end(JSON.stringify(response));
            }
//            callback();
        });
    }
}

exports.load_history = function (req, res) {
    var db = req.app.get('db');
    var collection = db.collection('history_send');
    collection.find({}).toArray(
            function (err, result) {
                if (err)
                    return res.status(201).json({
                        error: "No history!",
                        success: false
                    });
                res.status(200).json(result);
            }
    );
}

exports.load_history_chrome = function (req, res) {
    var db = req.app.get('db');
    var collection = db.collection('history_send_chrome');
    collection.find({}).toArray(
            function (err, result) {
                if (err)
                    return res.status(201).json({
                        error: "No history!",
                        success: false
                    });
                res.status(200).json(result);
            }
    );
}
