'use strict';

// Libraries
const express = require('express');
const foo = require('./foo');
// Variables
const app = express();

// Import the routes
app.use('/api', foo.routes);

module.exports = app;
