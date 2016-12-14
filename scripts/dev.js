'use strict';

// Libraries
const api                  = require('../api');
const hotMiddleware        = require('webpack-hot-middleware')
const log                  = require('log')('dev.js');
const spawn                = require('child_process').spawn;
const webpack              = require('webpack');
const webpackConfig        = require('../webpack.config.js');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackDevServer     = require('webpack-dev-server');

// Load the configuration
const config = require('../config.json');
config.server.address = config.server.address || 'localhost';

// Add webpack dev server to config
webpackConfig.entry.app = []
.concat([
  // 'webpack-dev-server/client?http://' + config.server.address + ':' + config.server.port + '/',
  // 'webpack/hot/dev-server',
  // 'webpack-hot-middleware/client?http://' + config.server.address + ':' + config.server.port + '/',
  'webpack-hot-middleware/?path=/__webpack_hmr',
])
.concat(webpackConfig.entry.app)
;

// Variables
const compiler = webpack(webpackConfig);
// const app      = new WebpackDevServer(compiler, {
//   //historyApiFallback: true,
//   hot:                true,
//   //inline:             true,
// });
api.use(hotMiddleware(compiler));

// Allow the API to handle requests too
api.use(webpackDevMiddleware(compiler, {
  //historyApiFallback: true,
  hot:                true,
  // inline:             true,
}));

log.info('Starting the api server...', {port: config.server.port});

// Launch the server
api.listen(config.server.port || config.server.address.port, () => {
  // Tell people the instance is running
  log.info('Server listening at %s', config.server.href);
  // If the user has requested to open the page on launch, then open it
  if (process.argv.indexOf('open') > -1)
    spawn('open', ['http://localhost:' + config.server.port]);
});
