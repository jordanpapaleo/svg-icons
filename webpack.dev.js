const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    devServerClient: 'webpack-dev-server/client?http://localhost:3001',
    react: ['./src/examples/react/index.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3001'],
    angular: ['./src/examples/angular/index.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3001'],
    vanilla: ['./src/examples/vanilla/index.js', 'webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:3001']
  },
  output: {
    filename: '[name].bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    modules: [resolve('node_modules')],
    extensions: ['.js', '.json']
  },
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    noParse: /node_modules\/.bin/,
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['react'],
      filename: 'react.html',
      template: resolve(__dirname, 'src/examples/react/index.html')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['angular'],
      filename: 'angular.html',
      template: resolve(__dirname, 'src/examples/angular/index.html')
    }),
    new HtmlWebpackPlugin({
      inject: true,
      chunks: ['vanilla'],
      filename: 'vanilla.html',
      template: resolve(__dirname, 'src/examples/vanilla/index.html')
    })
  ]
}
