const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const paths = require('./paths');

module.exports = {
  mode: 'development',
  entry: {
    index: resolve(paths.SRC_PATH, './index.js'),
    login: resolve(paths.SRC_PATH, './login.js'),
  },
  output: {
    path: paths.BUILD_PATH,
    filename: 'assets/js/[name].[hash:8].js',
    chunkFilename: 'assets/js/[name].[hash:8].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: resolve('src'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-runtime'
            ]
          }
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'assets/images/[name].[hash:8].[ext]',
            esModule: false
          }
        }
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4196,
            name: 'assets/fonts/[name].[hash:8].[ext]',
            esModule: false
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(paths.PUBLIC_PATH, './index.html'),
      favicon: resolve(paths.PUBLIC_PATH, './favicon.ico'),
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: resolve(paths.PUBLIC_PATH, './index.html'),
      favicon: resolve(paths.PUBLIC_PATH, './favicon.ico'),
      chunks: ['login']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    open: true,
    hot: true,
    historyApiFallback: true,
    host: 'localhost',
    port: 3000
  },
  devtool: 'cheap-module-source-map'
}