const merge = require('webpack-merge')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const prodWebpackConfig = require('./webpack.prod.conf')

module.exports = merge(prodWebpackConfig, {
  plugins: [
    // 增加输出分析
    new BundleAnalyzerPlugin()
  ]
})
