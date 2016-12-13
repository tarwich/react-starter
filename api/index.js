'use strict';

// Libraries
const path = require('path');

// Make NodeJS look up modules starting in app root
process.env.NODE_PATH = path.resolve('.', 'api');
// Apply the NODE_PATH variable
require('module').Module._initPaths();
// Run the server
module.exports = require('app');
