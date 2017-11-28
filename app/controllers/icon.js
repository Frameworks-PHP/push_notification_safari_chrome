var path = require('path');
var fs = require('fs');


var mkdirp = require('mkdirp');
//var sharp = require('sharp');
var Jimp = require("jimp");

//var upload = multer({storage: storage});

//var storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//        cb(null, path.join(__dirname + '/uploads/'))
//    },
//    filename: function (req, file, cb) {
//        cb(null, file.originalname)
//    }
//})

exports.uploadfunction = function (req, res) {
    var dir = './app/controllers/safari-push/configs/' + req.body.domain;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    if (!fs.existsSync(dir + '/icon.iconset')) {
        fs.mkdirSync(dir + '/icon.iconset');
    }
    var dir_icon = dir + '/icon.iconset/';

    var file = dir + '/icon.iconset/' + 'default.png';

//    fs.readFile(req.file.path, function (err, data) {
//        fs.writeFile(file, data, function (err) {
//            if (err) {
//                console.error(err);
//                response = {
//                    message: 'Sorry, file couldn\'t be uploaded.',
//                    filename: req.file.originalname
//                };
//            } else {
//                resizeandcopy(file, dir_icon);
//                response = {
//                    message: 'File uploaded successfully',
//                    filename: req.file.originalname
//                };
//            }
//            res.end(JSON.stringify(response));
//        });
//    });
    
    fs.rename(req.file.path, file, function (err) {
        if (err) {
            console.log(err);
            response = {
                message: 'Sorry, file couldn\'t be uploaded.',
                filename: req.file.originalname,
                code:false
            };
//            res.send(500);
        } else {
            resizeandcopy(file, dir_icon);
            response = {
                message: 'icon uploaded successfully',
                filename: req.file.originalname,
                code:true
            };
        }
        res.end(JSON.stringify(response));
    });
}

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
                    code:false
                };
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: req.file.originalname,
                    code:true
                };
            }
            res.end(JSON.stringify(response));
        });
    });
}

function resizeandcopy(file, dir) {
    
    Jimp.read(file, function (err, lenna) {
        if (err) throw err;
        lenna.resize(16, 16)
            .write(dir+"icon_16x16.png"); // save 
    });
    Jimp.read(file, function (err, lenna) {
        if (err) throw err;
        lenna.resize(32, 32)   
            .write(dir+"icon_16x16@2x.png"); 
    });
    Jimp.read(file, function (err, lenna) {
        if (err) throw err;
        lenna.resize(32, 32)   
            .write(dir+"icon_32x32.png"); 
    });
    Jimp.read(file, function (err, lenna) {
        if (err) throw err;
        lenna.resize(64, 64)            
            .write(dir+"icon_32x32@2x.png"); 
    });
    Jimp.read(file, function (err, lenna) {
        if (err) throw err;
        lenna.resize(128, 128)            
            .write(dir+"icon_128x128.png"); 
    });
    Jimp.read(file, function (err, lenna) {
        if (err) throw err;
        lenna.resize(256, 256)            
            .write(dir+"icon_128x128@2x.png"); 
    });
        
    
//    sharp(file)
//            .resize(16, 16)
//            .toFile(dir + 'icon_16x16.png', function (err) {
//                // output.jpg is a 16 pixels wide and 16 pixels high image
//                // containing a scaled and cropped version of input.jpg
//            });
//
//    sharp(file)
//            .resize(32, 32)
//            .toFile(dir + 'icon_16x16@2x.png', function (err) {
//            });
//
//    sharp(file)
//            .resize(32, 32)
//            .toFile(dir + 'icon_32x32.png', function (err) {
//            });
//
//    sharp(file)
//            .resize(64, 64)
//            .toFile(dir + 'icon_32x32@2x.png', function (err) {
//            });
//
//    sharp(file)
//            .resize(128, 128)
//            .toFile(dir + 'icon_128x128.png', function (err) {
//            });
//
//    sharp(file)
//            .resize(256, 256)
//            .toFile(dir + 'icon_128x128@2x.png', function (err) {
//            });
//
//    sharp.cache(false);
}