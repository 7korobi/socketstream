var fs;

fs = require('fs');

module.exports = function(responderId, config, ss) {
  var code, name;
  name = config && config.name || 'events';
  code = fs.readFileSync(__dirname + '/client.' + (process.env['SS_DEV'] && 'coffee' || 'js'), 'utf8');
  ss.client.send('mod', 'events-responder', code, {
    coffee: process.env['SS_DEV']
  });
  ss.client.send('code', 'init', "require('events-responder')(" + responderId + ", {}, require('socketstream').send(" + responderId + "));");
  return {
    name: name,
    interfaces: function(middleware) {
      return {
        websocket: function(msg, meta, send) {
          return send(JSON.stringify(msg));
        }
      };
    }
  };
};
