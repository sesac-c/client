const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript'
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.ProvidePlugin({
      React: 'react'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  }
};