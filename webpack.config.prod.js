import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  debug: true,
  devtool: 'source-map',
  noInfo: false,
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  plugins: [
    //Generate a seperate css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    //hash files so name changes when content changes
    new WebpackMd5Hash(),
    //Create seperate bundles so can be cached seperatly
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    //Create Html file that includes reference to bundle js
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: { // html minify options
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true,
      rollbarToken: "5021b662b9784587b149d5ca366d6e07"
    }),
    //Eliminate duplicate packages
    new webpack.optimize.DedupePlugin(),
    //Minify js
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap') }
    ]
  }
}
