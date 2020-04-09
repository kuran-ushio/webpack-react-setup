const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const paths = require('./paths');

module.exports = {
  mode: 'production',
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
          MiniCssExtractPlugin.loader,
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
      chunks: ['index'],
      minify: {
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: resolve(paths.PUBLIC_PATH, './index.html'),
      favicon: resolve(paths.PUBLIC_PATH, './favicon.ico'),
      chunks: ['login'],
      minify: {
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[hash:8].css',
      chunkFilename: 'assets/css/[name].[hash:8].chunk.css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        exclude: /node_modules/,
        sourceMap: true,
        terserOptions: {
          compress: {
            drop_console: true
          },
          ie8: false
        },
      })
    ],
    splitChunks: {
      chunks: 'initial',
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: 1
        },
        commons: {
          name: 'commons',
          chunks: "initial",
          minChunks: 2
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
    concatenateModules: true,
  },
  devtool: 'nosources-source-map'
}