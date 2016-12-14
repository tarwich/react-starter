'use strict';

// Libraries
const express = require('express');
// Variables
const routes = new express.Router();

routes.get('/foo', (request, response) => {
  setTimeout(() => {
    response.send('bar');
  }, 3 * 1000);
});

module.exports = routes;
