'use strict';

// Libraries
const path              = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack           = require('webpack');
const bourbon           = require('bourbon');

const config = require('config.json');

if (!((config || {}).build || {}).path) {
  console.error('You must specify a config.build.path in config.json');
  process.exit(1);
}

module.exports = {
  entry: {
    app: 'index',
  },
  module: {
    loaders: [
      // Copy the index.html straight to the output folder
      {test: /index.html$/, loader: 'file?name=[name].[ext]'},
      // Copy these files as-is into the output directory
      {test: /\.(eot|ico|svg|ttf|woff2?)$/, loader: 'file?name=[name].[ext]'},
      // Allow loading config.json so that we can have config values show up in
      // the client-side code
      {test: /\.json$/, loader: 'json'},
      // Load typescript
      {test: /\.tsx?$/, loader: 'babel?presets[]=es2015!ts'},
      // Don't embed CSS in the JavaScript. Instead, bundle it all into a
      // separate CSS file
      {test: /\.scss$/, loader: ExtractTextPlugin.extract(
        'style', 'css!resolve-url!sass?sourceMap'
      )},
    ],
  },
  output: {
    chunkFilename: '[id].js',
    // devtool:       'cheap-module-eval-source-map',
    filename:      '[name].js',
    path:          path.resolve('.', config.build.path),
  },
  plugins: [
    // Automatically move everything in node_modules out of app.js into vendor.js
    new webpack.optimize.CommonsChunkPlugin({
      name:      'vendor',
      filename:  'vendor.js',
      minChunks: module => /\/node_modules\/./.test(module.userRequest)
    }),
    // Separate CSS files instead of adding the CSS to the bundle
    new ExtractTextPlugin('[name].css'),
  ],
  // Tell Webpack how to load files
  resolve: {
    // These extensions should be tried when you require something without an
    // extension
    extensions: ['', '.ts', '.tsx', '.js', '.jsx'],
    // This is how webpack should search for files
    root:       [
      path.resolve('.', 'web', 'src'),
      path.resolve('.', 'web', 'static'),
    ],
  },
  // Options for the SCSS parser
  sassLoader: {
    includePaths: [
      path.resolve('.', 'web', 'src'),
      path.resolve('.', 'node_modules'),
      ...bourbon.includePaths,
    ]
  },
};
