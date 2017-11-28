
/*!
 * Agent (Agent)
 */

module.exports.Agent = require('./lib/agent/live');

/*!
 * Device
 */

exports.Device = require('./lib/device');

/*!
 * Agent (Mock)
 */

exports.MockAgent = require('./lib/agent/mock');

/*!
 * Feedback (Live)
 */

exports.Feedback = require('./lib/feedback/live');

/*!
 * Feedback (Mock)
 */

exports.MockFeedback = require('./lib/feedback/mock');


/*!
 * Errors
 */

exports.errors = require('./lib/errors');