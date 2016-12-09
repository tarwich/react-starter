'use strict';

// Libraries
const express = require('express');
// Variables
const app = express();

// Import the routes
app.use(require('foo').routes);

module.exports = app;
