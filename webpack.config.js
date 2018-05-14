const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const buildPath = path.join(__dirname, './build');
const sourcePath = path.join(__dirname, './src');

const config = {
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devtool: 'eval-source-map',
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
      ],
    },
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?camelCase&modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      }),
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader?camelCase&modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
      }),
    },
    {
      test: /\.(png|jpg|)$/,
      loader: 'url?limit=25000',
    },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    historyApiFallback: true,
    inline: true,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        pathRewrite: { '^/api': '' },
        secure: false
      }
    }
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, './src/components/'), 'node_modules'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
    }
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new HtmlWebpackPlugin({
      template: path.join(buildPath, 'index.html'),
      inject: true,
    }),
  ]
};

module.exports = config;
