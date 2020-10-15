const path = require('path')
const { cssModule, cssNormal } = require('./css-module')

module.exports = {
  entry: {
    app: require.resolve('../src/main.tsx')
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },

  mode: 'none',

  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx|ts|tsx)$/,
            use: [{
              loader: 'babel-loader',
              options: {
                cacheDirectory: './webpack_cache/',
              },
            }],
            include: path.resolve(__dirname, '../src')
          },
          {
            test: /\.module\.(c|le)ss$/,
            use: cssModule
          },
          {
            test: /\.(c|le)ss$/,
            use: cssNormal
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: './dist/[name].[hash:8].[ext]',
            },
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.less$/],
            loader: 'file-loader',
            options: {
              name: './dist/[name].[hash:8].[ext]',
            }
          }
        ]
      }
    ]
  }
}
