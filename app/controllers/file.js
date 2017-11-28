var path = require('path');
var fs = require('fs');

var mkdirp = require('mkdirp');
//var sharp = require('sharp');
var Jimp = require("jimp");

exports.uploadcert = function (req, res) {
    var dir = './app/controllers/safari-push/configs/' + req.body.domain;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    var file = dir + '/' + req.file.originalname;

    fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.error(err);
                response = {
                    message: 'Sorry, file couldn\'t be uploaded.',
                    filename: req.file.originalname,
                    code: false
                };
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.file.originalname,
                    code: true
                };
            }
            res.end(JSON.stringify(response));
        });
    });
}
