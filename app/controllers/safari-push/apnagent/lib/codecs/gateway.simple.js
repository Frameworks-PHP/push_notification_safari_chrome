/*!
 * apnagent - Simple Codec
 * Copyright(c) 2017 Sáu Nghĩa <saunghia@gmail.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var lotus = require('lotus');

/**
 * .decode
 *
 * Simple Apple Push Notifications protocol.
 * See APN documents for the specification.
 *
 * @api public
 */

exports.decode = lotus.decode()
  .u16be('tokenLen')
  .take('tokenLen', 'deviceToken')
  .u16be('payloadLen')
  .take('payloadLen', 'payload', JSON.parse);

/**
 * .encode
 *
 * Enhanced Apple Push Notifications protocol.
 * See APN documents for the specifications.
 *
 * @api public
 */

exports.encode = lotus.encode()
  .u16be(function (msg) {
    return msg.deviceToken.length;
  })
  .push('deviceToken')
  .u16be(function (msg) {
    var payload = JSON.stringify(msg.payload);
    return Buffer.byteLength(payload, 'utf8');
  })
  .write('payload', 'utf8', JSON.stringify);
