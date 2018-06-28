const path = require('webpack')
const DefinePlugin = require('webpack/lib/DefinePlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin')

module.exports = {
  entry: [
    require.resolve('./polyfill'),
    require.resolve('../src/main.js')
  ],

  output: {
  },

  resolve: {

  },

  modules: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: ['eslint-loader'],
        include: path.resolve(__dirname, '../src')
      },
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            use: [{
              loader: 'babel-loader',
              options: {
                // 将 babel 编译过的模块缓存在 webpack_cache 目录下，下次优先复用
                cacheDirectory: './webpack_cache/',
              },
            }],
            include: path.resolve(__dirname, '../src')
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.scss$/,
            use: ['style-loader', 'css-loader',
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9',
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              }, 'sass-loader']
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
            exclude: [/\.js$/, /\.html$/, /\.json$/, /\.scss$/],
            loader: 'file-loader',
            options: {
              name: './dist/[name].[hash:8].[ext]',
            }
          }
        ]
      }]
  }
}