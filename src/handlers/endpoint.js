module.exports = {
  endpointHandler: function(app) {
    var path = require('path');
    var dir = __dirname.split('/').slice(0, __dirname.split('/').length - 1).join('/') + '/endpointgets';
    var endpoints = new Map();
    var fs = require('fs');
    const endpointFiles = fs.readdirSync(path.resolve(dir)).filter(n => n.endsWith('.js'));
    endpointFiles.forEach(endpointFile => {
      const EndpointFile = require(dir + '/' + endpointFile);
      endpoints.set(EndpointFile.endpoint, EndpointFile);
    });
    endpoints.forEach(obj => {
    app.get(obj.endpoint, (req, res) => {
      obj.func(req, res);
    })
  })
    app.listen(3000, () => console.log('Web launched.'))

  }
}