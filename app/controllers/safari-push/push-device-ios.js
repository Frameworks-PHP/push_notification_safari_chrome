

var join = require('path').join
        , pfx = join(__dirname, '/configs/vn.mecorp.xungdanhanhhung/apns_vn_mecorp_xungdanhanhhung.p12');
        //, pfx = join(__dirname, '/configs/web.langgame.casual.mmo.slg/apns_pfx.p12');

//console.log(pfx);
// Create a new agent
var apnagent = require('./apnagent')
        , agent = module.exports = new apnagent.Agent()
        , device = module.exports = new apnagent.Device();

// set our credentials
agent.set('pfxfile', pfx);

agent.enable('sandbox');

agent.on('message:error', function (err, msg) {

  switch (err.name) {
    // This error occurs when Apple reports an issue parsing the message.
    case 'GatewayNotificationError':
      console.log('[message:error] GatewayNotificationError: %s', err.message);

      // The err.code is the number that Apple reports.
      // Example: 8 means the token supplied is invalid or not subscribed
      // to notifications for your application.
      if (err.code === 8) {
        console.log('    > %s', msg.device().toString());
        // In production you should flag this token as invalid and not
        // send any futher messages to it until you confirm validity
      }

      break;

    // This happens when apnagent has a problem encoding the message for transfer
    case 'SerializationError':
      console.log('[message:error] SerializationError: %s', err.message);
      break;

    // unlikely, but could occur if trying to send over a dead socket
    default:
      console.log('[message:error] other error: %s', err.message);
      break;
  }
});
agent.connect(function (err) {
    // gracefully handle auth problems
    //console.log(err);
    if (err && err.name === 'GatewayAuthorizationError') {
        console.log('Authentication Error: %s', err.message);
        process.exit(1);
    }

    // handle any other err (not likely)
    else if (err) {
        console.log(err);
        //throw err;
    }

    // it worked!
    var env = agent.enabled('sandbox')
            ? 'sandbox'
            : 'production';

    console.log('apnagent [%s] gateway connected', env);

});
//query db
device.setDeviceToken('c44a1085c65fe165ae0a252ed27541167b2c99d49a546a9d260247ff38942e5b');

agent.createMessage()
        .device(device)
        .alert('Thành công với push IOS device rồi.')
        .badge(2)
        .expires('1d')
        .send();

        