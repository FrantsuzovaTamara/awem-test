const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin')
const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        type: 'asset/inline',
      },
      {
        test: /\.(json|atlas)$/i,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: isDevelopment
        ? false
        : {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
          },
      inject: 'body',
      scriptLoading: 'blocking',
    }),
    !isDevelopment &&
      new HtmlInlineScriptPlugin({
        scriptMatchPattern: [/\.js$/],
      }),
  ].filter(Boolean),
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
  },
  mode: 'prodaction',
}
