/*!
 * apnagent - Response Codec
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
 * Response Apple Push Notifications protocol.
 * See APN documents for the specification.
 *
 * @api public
 */

exports.decode = lotus.decode()
  .take(1, 'code')
  .u32be('identifier');
