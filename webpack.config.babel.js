const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const OfflinePlugin = require('offline-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const AppShellRenderer = require('./app-shell-renderer.js')

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-navigation', 'react-dom', 'redux', 'axios', 'react-redux', 'redux-thunk', 'uuid', 'query-string']
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[id].[hash:8].chunk.js'
  },
  resolve: {
    alias: {
      style: path.resolve(__dirname, './src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: './src/CNAME' }]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      removeRedundantAttributes: true,
      inject: false,
      manifest: PROD
        ? 'manifest.json'
        : '/assets/manifest.json',
      GOOGLE_ANALYTICS_UA: process.env.GOOGLE_ANALYTICS_UA,
      minify: {
        collapseWhitespace: PROD,
        removeComments: PROD
      },
      rendered: AppShellRenderer('./src', './src/reducers')
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    })
  ].concat(PROD ? [
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      updateStrategy: 'all',
      safeToUseOptionalCaches: true,
      caches: 'all',
      ServiceWorker: {
        navigateFallbackURL: '/',
        events: true
      },
      AppCache: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: 0
      },
      compress: {
        unused: 1,
        warnings: 0
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ] : [])
}
