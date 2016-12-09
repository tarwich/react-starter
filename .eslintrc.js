'use strict';

const path = require('path');

module.exports = {
  extends: path.resolve('node_modules', 'eslint-config-tarwich', 'index.js'),
  rules:   {
    'key-spacing': ['ignore', {align: 'value'}],
    'sort-keys':   ['ignore', 'asc', {caseSensitive: true, natural: true}],
  },
};
