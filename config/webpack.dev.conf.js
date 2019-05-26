const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf')

module.exports = merge(baseWebpackConfig, {
  optimization: {
    namedModules: true,
    namedChunks: true,
    nodeEnv: 'development',
    splitChunks: {
      hidePathInfo: false,
      minSize: 10000,
      maxAsyncRequests: Infinity,
      maxInitialRequests: Infinity,
    },
    noEmitOnErrors: false,
    checkWasmTypes: false,
  },

  devtool: 'cheap-module-eval-source-map',

  output: {
    pathinfo: true
  },

  profile: true,
  cache: true,

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NamedChunksPlugin(),
    new webpack.HotModuleReplacementPlugin(),

    // 生成自动引用文件的html模板
    new HtmlWebpackPlugin({
      template: require.resolve('../index.html'),
      inject: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ],

  devServer: {
    compress: true,
    port: 3000,
    clientLogLevel: 'none',
    hot: true,
    stats: {
      all: false,
      modules: false,
      errors: true,
      warnings: true,
      colors: true,
      assets: true,
      timings: true,
    }
  }
})
