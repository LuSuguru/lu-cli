const path = require('path')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: {
    app: require.resolve('../src/main.js')
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.js', '.jsx']
  },

  mode: 'none',

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
                cacheDirectory: './webpack_cache/',
              },
            }],
            include: path.resolve(__dirname, '../src')
          },
          {
            test: /\.(c|le)ss$/,
            use: ['style-loader', 'css-loader',
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer(),
                  ],
                },
              }, 'less-loader']
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
