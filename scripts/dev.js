'use strict';

// Libraries
const api              = require('../api');
const log              = require('log')('dev.js');
const spawn            = require('child_process').spawn;
const webpack          = require('webpack');
const webpackConfig    = require('../webpack.config.js');
const WebpackDevServer = require('webpack-dev-server');

// Load the configuration
const config = require('../config.json');

// Add webpack dev server to config
webpackConfig.entry.app.push(...[
  'webpack-dev-server/client?http://localhost:' + config.server.port + '/',
  'webpack/hot/dev-server',
]);

// Variables
const compiler = webpack(webpackConfig);
const app      = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot:                true,
  inline:             true,
});

// Allow the API to handle requests too
app.use(api);

log.info('Starting the api server...', {port: config.server.port});

// Launch the server
app.listen(config.server.port || config.server.address.port, () => {
  // Tell people the instance is running
  log.info('Server listening at %s', config.server.href);
  // If the user has requested to open the page on launch, then open it
  if (process.argv.indexOf('open') > -1)
    spawn('open', ['http://localhost:' + config.server.port]);
});
