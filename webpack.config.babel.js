const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const ManifestPlugin = require('webpack-assets-manifest')
const OfflinePlugin = require('offline-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const AppShellRenderer = require('./app-shell-renderer.js')

const PROD = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: './src/index.js',
    vendor: ['react', 'react-router-dom', 'react-dom', 'redux', 'axios', 'react-redux', 'redux-thunk', 'uuid', 'query-string', 'aphrodite', 'lodash.debounce', 'react-textarea-autosize']
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.GOOGLE_ANALYTICS_UA': JSON.stringify(process.env.GOOGLE_ANALYTICS_UA)
    }),
    new FaviconsWebpackPlugin({
      logo: './src/logo.png',
      prefix: 'icons/',
      emitStats: false,
      inject: false,
      title: 'Prior.ly',
      icons: {
        firefox: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      removeRedundantAttributes: true,
      inject: false,
      manifest: 'manifest.json',
      GOOGLE_ANALYTICS_UA: process.env.GOOGLE_ANALYTICS_UA,
      minify: {
        collapseWhitespace: PROD
      },
      rendered: AppShellRenderer('./src/App', './src/reducers')
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    }),
    new ManifestPlugin({
      output: 'manifest.json',
      merge: true
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
  ] : []),
  devServer: {
    historyApiFallback: {
      verbose: true,
      disableDotRule: true
    }
  }
}
