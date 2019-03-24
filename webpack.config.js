const path = require("path");

const webpack = require("webpack");

const bundlePath = path.resolve(__dirname, "/public/js");

const mode = process.env.NODE_ENV || 'development';

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8000,
            name: 'images/[name].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  output: {
    path    : path.resolve(__dirname, "public/js/"),
    filename: "bundle.js"
  },
  plugins: [ 
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: mode
};

if (mode == 'development') {

  config.devServer = {
    contentBase: path.join(__dirname,'public'),
    port: 3000,
    publicPath: "http://localhost:3000/js/dist"
  };

}
else if (mode == 'production') {

  config.optimization = {
    // TODO: look at optimizing further with chunking
    minimizer: [
      new UglifyJsPlugin ({})
    ]

  };

}

module.exports = config;
