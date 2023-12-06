const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const {InjectManifest} = require('workbox-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () =>
{
  return {
    mode: 'development',
    entry:
    {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output:
    {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins:
    [
      new HtmlWebpackPlugin(
      {
        template: './index.html',
        title: 'JATE'
      }),
      new GenerateSW(),
      new WebpackPwaManifest(
      {
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'Just another text editor',
        icons:
        [
          {
            src: path.resolve('./src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512]
          },
        ],
      }), 
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};