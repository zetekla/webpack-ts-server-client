const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackObj = {
  title: 'custom site',
  template: '!!ejs-loader!./modules/App/index.html'
};

module.exports = {
  context: __dirname,
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  entry: './Server/main.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'backend.js'
  },
  devServer: {
    inline: true,
    port: 7788
  },

  module: {
    loaders: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
    rules: [{
      test: /\.html$/,
      use: [ {
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.es6', '.json', '.coffee']
  },
  plugins: !isProd ? [new HtmlWebpackPlugin(HtmlWebpackObj)] : [
    new HtmlWebpackPlugin(HtmlWebpackObj),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
  ]
};