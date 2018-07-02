const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')
const Dashboard = require('webpack-dashboard')
const DashboardPlugin = require('webpack-dashboard/plugin')
const dashboard = new Dashboard()

module.exports = merge(baseWebpackConfig, {
  optimization: {
    namedModules: true,
    namedChunks: true
  },

  devtool: '#cheap-module-eval-source-map',

  output: {
    pathinfo: true //输入代码添加额外的路径注释，提高代码可读性
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    // 生成自动引用文件的html模板
    new HtmlWebpackPlugin({
      template: require.resolve('../index.html'),
      inject: true,
    }),

    // 配置开发环境的全局变量
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
    new DashboardPlugin(dashboard.setData)
  ],
  // 本地服务器配置
  devServer: {
    // 跨域代理
    proxy: {
      '/api': {
        target: 'http://47.97.114.190:8080',
        secure: false,
        changeOrigin: true
      }
    },
    historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    progress: true
  }
})