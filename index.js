const { express } = require('./src/dependencies');
const { endpointHandler } = require('./src/handlers/endpoint');
const { launch } = require('./src/pinger');
endpointHandler(express());
launch();