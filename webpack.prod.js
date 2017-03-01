const { resolve } = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    './src/svgService.js'
  ],
  output: {
    filename: 'svgService.min.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'source-map',
  resolve: {
    modules: [resolve('node_modules')],
    extensions: ['.js', '.json']
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
    new webpack.optimize.AggressiveMergingPlugin({}),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        booleans: true,
        cascade: true,
        comparisons: true,
        conditionals: true,
        dead_code: true,
        drop_console: true,
        drop_debugger: true,
        evaluate: true,
        hoist_funs: true,
        hoist_vars: true,
        if_return: true,
        join_vars: true,
        loops: true,
        negate_iife: true,
        properties: true,
        sequences: true,
        unsafe: true,
        unused: true,
        warnings: false
      },
      mangle: {
        toplevel: true,
        sort: true,
        eval: true,
        properties: true
      },
      output: {
        space_colon: false,
        comments: false
      }
    })
  ]
}
