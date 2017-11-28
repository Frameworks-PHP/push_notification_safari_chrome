
exports.savePushToken = function (req, res) {
    var domainId = req.body.domain,
        title = req.body["title"],
        body = req.body["body"],
        button = req.body["button-label"],
        urlargs = [req.body["path-redirect"]];

    var DataPushToken = {
        domainId : domainId,
        title: title,
        body: body,
        button: button,
        urlargs: urlargs
    };

    //check site exists or not.
    var db = req.app.get('db');
    var collection = db.collection('pushtoken');
    
    var insertDocument = function (db, callback, datainsert) {
        console.log("insert");
        db.insertOne(datainsert, function (err, result) {
            callback(result);
        });
    }
    
    insertDocument(collection, function (err, data) {}, DataPushToken);
    

    
//    var eventEmitter = new events.EventEmitter();
//    
//    // listener #1
//    var listner1 = function listner1() {
//       console.log('listner1 executed.');
//    }
//
//    // listener #2
//    var listner2 = function listner2() {
//      console.log('listner2 executed.');
//    }
//
//    // Bind the connection event with the listner1 function
//    eventEmitter.addListener('connection', listner1);
//
//    // Bind the connection event with the listner2 function
//    eventEmitter.on('connection', listner2);
//
//    var eventListeners = require('events').EventEmitter.listenerCount
//       (eventEmitter,'connection');
//    console.log(eventListeners + " Listner(s) listening to connection event");
//
//    // Fire the connection event 
//    eventEmitter.emit('connection');
//
//    // Remove the binding of listner1 function
//    eventEmitter.removeListener('connection', listner1);
//    console.log("Listner1 will not listen now.");
//
//    // Fire the connection event 
//    eventEmitter.emit('connection');
//
//    eventListeners = require('events').EventEmitter.listenerCount(eventEmitter,'connection');
//    console.log(eventListeners + " Listner(s) listening to connection event");
//
//    console.log("Program Ended.");

}
