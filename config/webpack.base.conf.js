const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: [
    require.resolve('./polyfill'),
    require.resolve('../src/main.js')
  ],

  output: {
    // 热加载不能使用chunkhash
    filename: 'dist/bundle.js',
    chunkFilename: 'dist/[name]_[hash:8].js',
    // path: path.resolve(__dirname, 'dist')
  },

  watch: true,
  // 监听模式运行时的参数
  // 在开启监听模式时，才有意义
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
    aggregateTimeout: 300,
    // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
    poll: 1000
  },

  resolve: {
    alias: {
      assets: path.resolve(__dirname, '../src/assets'),
      components: path.resolve(__dirname, '../src/components')
    },
    extensions: ['.js', '.jsx']
  },

  module: {
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
            test: /\.(sc|c)ss$/,
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
      }
    ]
  }
}