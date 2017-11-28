var configs = require(__dirname + '/configs/env/' + process.env.NODE_ENV);


var fs = require('fs'),
        crypto = require('crypto'),
        child_process = require('child_process'),
        rimraf = require('rimraf'),
        md5 = require('md5');

var createPackage = function (res, path, pushpackage, domain) {
    
    if (configs[pushpackage][domain] === undefined) {
        throw new Error('Config is not exits.');
        return;
    }
    var info = configs[pushpackage][domain];
    //console.log(configs);
    var manifest = {},
            pathDestination = path + '/' + domain + '/unsignature',
            pathSource = path + '/' + domain,
            pathSignature = path + '/' + domain + '/' + info.signature + '.zip';

    var websiteName = info.websiteName,
            websitePushID = pushpackage,
            allowedDomains = info.allowedDomains,
            webServiceURL = info.webServiceURL + '/' + domain,
            urlFormatString = info.urlFormatString,
            certP12 = path + '/' + info.certP12,
            certPasswd = info.certPasswd,
            authenticationToken = md5('d53f71f909_' + pushpackage + domain); //p12 password

/////////////////////////////////////////////


    var raw_files = [
        'icon.iconset/icon_16x16.png',
        'icon.iconset/icon_16x16@2x.png',
        'icon.iconset/icon_32x32.png',
        'icon.iconset/icon_32x32@2x.png',
        'icon.iconset/icon_128x128.png',
        'icon.iconset/icon_128x128@2x.png'
    ];

    var website = {
        "websiteName": websiteName,
        "websitePushID": websitePushID,
        "allowedDomains": allowedDomains,
        "urlFormatString": urlFormatString,
        "authenticationToken": authenticationToken, //any token to auth user
        "webServiceURL": webServiceURL
    };



    if (fs.existsSync(pathDestination)) {
        rimraf.sync(pathDestination);
    }

    fs.mkdirSync(pathDestination);
    fs.mkdirSync(pathDestination + "/icon.iconset");

    for (var i in raw_files) {
        child_process.execSync("cp '" + pathSource + '/' + raw_files[i] + "' '" + pathDestination + '/' + raw_files[i] + "'");
    }

    fs.writeFileSync(pathDestination + '/website.json', JSON.stringify(website));

    raw_files.push("website.json");
    for (var i in raw_files) {
        var file = raw_files[i];
        var sha1 = crypto.createHash('sha1');
        sha1.update(fs.readFileSync(pathDestination + '/' + file), 'binary');
        manifest[file] = sha1.digest('hex');
    }

    fs.writeFileSync(pathDestination + '/manifest.json', JSON.stringify(manifest));

    child_process.execSync("openssl pkcs12 -in \"" + certP12 + "\" -nocerts -out \"" + pathSource + "/private.pem\" -passin pass:" + certPasswd + " -passout pass:" + certPasswd);
    child_process.execSync("openssl pkcs12 -in \"" + certP12 + "\" -clcerts -nokeys -out \"" + pathSource + "/cert.pem\" -passin pass:" + certPasswd);

    child_process.execSync("openssl smime -binary -sign -certfile \"" + __dirname + "/AppleWWDRCA.pem\" -signer \"" + pathSource + "/cert.pem\" -inkey \"" + pathSource + "/private.pem\" -in \"" + pathDestination + "/manifest.json\" -out \"" + pathDestination + "/signature\" -outform DER -passin pass:" + certPasswd);

    raw_files.push("manifest.json");
    raw_files.push("signature");

    if (fs.existsSync(pathSignature)) {
        fs.unlink(pathSignature);
    }

    var archiver = require('archiver'),
            output = fs.createWriteStream(pathSignature),
            archive = archiver('zip', {
                zlib: {level: 9} // Sets the compression level.
            });

    //console.log(output);
    // listen for all archive data to be written
    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');

        fs.unlink(pathSource + "/cert.pem");
        fs.unlink(pathSource + "/private.pem");
        //rimraf.sync(pathSignature);

        //response file

        fs.readFile(pathSignature, function (error, data) {
            if (!error) {
                res.writeHead(200, {'Content-Type': 'application/zip'});
                res.end(data);
            } else {
                res.writeHead(500);
                res.end();
            }
        });
    });

// good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function (err) {
        console.log(err);
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

// good practice to catch this error explicitly
    archive.on('error', function (err) {
        console.log('archive error');
        throw err;
    });

    archive.pipe(output);

    for (var i in raw_files) {
        var file = raw_files[i];
        //console.log(pathDestination + "/" + file);
        archive.append(fs.createReadStream(pathDestination + "/" + file), {name: file});
    }

    archive.finalize();

}

module.exports.createPackage = createPackage;