var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.ProvidePlugin({
      createjs: 'createjs-easeljs',
      draw: 'createjs-easeljs'
    })
  ]
};
