'use strict';

// Libraries
const express = require('express');
// Variables
const routes = new express.Router();

routes.get('/foo', (request, response) => response.send('bar'));

module.exports = routes;
