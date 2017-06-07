const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';
const webpack = require('webpack');
const path = require('path');
const globEntry = require('webpack-glob-entry');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackObj = {
  title: 'custom site',
  template: './index.html',
  minify: {
    html5 : true,
    minimize: true,
    removeComments: true,
    collapseWhitespace: true
  }
};

module.exports = {
  context: path.resolve('./Server'),
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  entry: {
    app: './main.ts',
    vendor: './vendor.ts'
  },
  // target: 'node',
  output: {
    path: path.resolve('./dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map',
    devtoolModuleFilenameTemplate: function (info) {
      return "file:///" + info.absoluteResourcePath;
    }
  },
  devServer: {
    inline: true,
    port: 7788
  },
  module: {
/*    loaders: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'babel',

        query: {
          presets: ['es2015', 'react']
        }
      }
    ],*/
    rules: [
      { enforce: 'pre', test: /\.ts$/, exclude: ["node_modules"], loader: 'ts-loader' },
      { test: /\.(test|spec|es5|es6)\.(js|bundle\.js)$/, loaders: "file-loader" },
      {
        test: /\.html$/,
        use: [{
          loader: 'ejs-loader'
        }]
      },
      { test: /\.css$/, loaders: ['style', 'css'] },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    modules: [path.resolve('./Server'), 'node_modules']
  },
  plugins: !isProd ? [new HtmlWebpackPlugin(HtmlWebpackObj)] : [
    new webpack.DefinePlugin({
      'process.env': { // eslint-disable-line quote-props
        NODE_ENV: JSON.stringify(nodeEnv)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin(HtmlWebpackObj),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      beautify: true,
      sourceMap: false,
      exclude: /\.(test|spec|es5|es6)\.(js|bundle\.js)/ig
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ]
};