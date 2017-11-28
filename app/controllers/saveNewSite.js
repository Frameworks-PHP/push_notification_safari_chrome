var fs = require('fs'),
        path = require('path'),
//        filePath = path.join(__dirname, 'path_push.js'),
        tfs = require('../controllers/path_push');

exports.saveNewSite = function (req, res) {

    console.log(req.body);
    var site = req.body.domain,
            webpushid = req.body.webpushid;
    var DataSaveNewSite = {
        site: site,
        webpushid: webpushid
    };
    //check site exists or not.
    var db = req.app.get('db');
    var collectionSite = db.collection('site');
    function checkDomainExists() {
        collectionSite.find({
            site: (site)
        }, {
            _id: 1,
            site: 1
        }).toArray(checkDomain);
    }

    var checkDomain = function (err, result) {
        if (err) {
            console.log(err);
            response = {
                message: 'Check Domain Exist Fail. Please try again',
                code: false
            };
            res.end(JSON.stringify(response));
        } else if (!result.length) {
            insertDocument(collectionSite, DataSaveNewSite);
        } else {
            response = {
                message: 'Domain has exist. Please try again.',
                code: false
            };
            res.end(JSON.stringify(response));
        }

    }

    var insertDocument = function (db, datainsert) {
        db.insertOne(datainsert, function (err, result) {
            if (err) {
                response = {
                    message: 'Insert fail. Please try again',
                    code: false
                };
            } else {
                response = {
                    message: 'Insert success.',
                    code: true
                };
                //đọc ghi file
                readwritepath_push(res, req);
            }
            res.end(JSON.stringify(response));
        });
    }

    checkDomainExists();
}


function readwritepath_push(res, req) {

    var webpushId = req.body.webpushid;
    var domain = req.body.domain;
    var allowedDomains = req.body.allowedDomains;
    var websiteName = req.body.websiteName;
    var webServiceURL = req.body.webServiceURL;
    var certP12file = req.body.certP12file;
    var certPushfile = req.body.certPushfile;
    var certPasswd = req.body.certPasswd;
    var stringfile = tfs;
    if (stringfile[webpushId] === undefined) {
        console.log(stringfile[webpushId]);

        var newpush = '"' + webpushId + '" : ' +
                '{' +
                '"' + domain + '":' +
                '{"path" : "configs",' +
                '"signature" : "signature",' +
                '"websiteName" : "' + websiteName + '",' +
                '"allowedDomains": [' + allowedDomains + '],' +
                '"webServiceURL": "' + webServiceURL + '",' +
                '"urlFormatString": "' + allowedDomains + '/%@",' +
                '"certP12": "' + certP12file + '",' +
                '"certPush":"' + certPushfile + '",' +
                '"certPasswd": "' + certPasswd + '"    },},'

        var stringcontain = JSON.stringify(stringfile);
        var string = stringcontain.slice(0, -1);
        var converstring = "module.exports =" + string + ',' + newpush + '}';

    } else {
        var newpush = {
            path : "configs",
            signature : "signaturesssss",
            websiteName : websiteName ,
            allowedDomains :[ allowedDomains ],
            webServiceURL: webServiceURL,
            urlFormatString: allowedDomains + "/%@",
            certP12: certP12file,
            certPush: certPushfile,
            certPasswd: certPasswd
        }
    
        stringfile[webpushId][domain] = newpush;
        var converstring = "module.exports =" + JSON.stringify(stringfile);
    }

    fs.writeFile(__dirname + "/path_push_3.js", converstring, function (err) {
        if (err)
            return console.log(err);
    });

}


