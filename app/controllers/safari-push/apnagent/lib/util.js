/*!
 * apnagent - util
 * Copyright(c) 2017 Sáu Nghĩa <saunghia@gmail.com>
 * MIT Licensed
 */

/*!
 * Module Dependencies
 */

var fs = require('fs');

/*!
 * APN Service Constants
 */

var APNS_PORT = 2195
  , APNS_PROD = 'gateway.push.apple.com'
  , APNS_SANDBOX = 'gateway.sandbox.push.apple.com'
  , FEED_PORT = 2196
  , FEED_PROD = 'feedback.push.apple.com'
  , FEED_SANDBOX = 'feedback.sandbox.push.apple.com';

/**
 * Trim a string to a specific length. It is
 * expected that the string is longer than len.
 *
 * @param {String} string to trim
 * @param {Number} number of characters to include.
 * @return {String}
 * @api public
 */

exports.trim = function (str, len) {
  var res = str.substr(0, len - 3);
  res = res.substr(0, Math.min(res.length, res.lastIndexOf(' ')));
  return res + '...';
};

exports.gatewayOptions = function (agent) {
  var opts = {};

   // console.log(agent);
  // get the tls host based on sandbox
  opts.host = agent.enabled('sandbox')
    ? APNS_SANDBOX
    : APNS_PROD;

  // use default port
  opts.port = APNS_PORT;

  // pull in tls options
  //console.log(agent);
  exports.tlsOptions(agent, opts);

  return opts;
};

exports.feedbackOptions = function (agent) {
  var opts = {};

  // get the tls host based on sandbox
  opts.host = agent.enabled('sandbox')
    ? FEED_SANDBOX
    : FEED_PROD;

  // use default port
  opts.port = FEED_PORT;

  // pull in tls options
  exports.tlsOptions(agent, opts);

  return opts;
};

exports.tlsOptions = function (agent, opts) {
  opts = opts || {};

  function copy (key) {
    if (agent.get(key)) opts[key] = agent.get(key);
  }

  function read (file) {
    if (!fs.existsSync(file)) return null;
    return fs.readFileSync(file);
  }

  // get our tls certificates
  if (agent.get('pfx') || agent.get('pfxfile')) {
    opts.pfx = agent.get('pfxfile')
      ? read(agent.get('pfxfile'))
      : agent.get('pfx');
  } else {
    opts.key = agent.get('keyfile')
      ? read(agent.get('keyfile'))
      : agent.get('key');
    opts.cert = agent.get('certfile')
      ? read(agent.get('certfile'))
      : agent.get('cert');
  }

  // apply ca certificate
  if (agent.get('ca')) {
    copy('ca');
    opts.ca = [ opts.ca ];
  }

  // include passphrase
  copy('passphrase');

  return opts;
};

var castArgs = function(objs){
    if('object' !== typeof objs)
        return objs;
    
    for(var name in objs){
      if('object' === typeof objs[name] && name.indexOf('-args') !== -1){
          objs[name] = Object.values(objs[name]);
          castArgs(objs[name]);
      }
  }
  return objs;
}

exports.castArgs = castArgs;

var findAppendArgs = function (opts, key, value) {
    if (opts === undefined && 'object' !== typeof opts)
        return;
    var keys = Object.keys(opts);
    if (keys.length === 0)
        return opts;

    for (var name in keys) {
        if (opts[keys[name]] !== undefined && 'object' === typeof opts[keys[name]]) {
            opts[keys[name]] = findAppendArgs(opts[keys[name]], key, value);
        }
    }
    return opts;
}

exports.findAppendArgs = findAppendArgs;