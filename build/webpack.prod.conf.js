const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const env = config.prod.env

module.exports = merge(baseConf, {
    mode: 'production',
    module: {
        rules: utils.styleLoaders({
            sourceMap: true,
            extract: true
        })
    },
    devtool: config.prod.productionSourceMap ? '#source-map' : false,
    plugins: [
        new ExtractTextPlugin({
            filename: config.prod.stylePath,
            allChunks: true
        }),
        new CleanWebpackPlugin(['../dist'], {allowExternal: true}),
        new ProgressBarPlugin(),
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' + config.prod.productionGzipExtension.join('|') + ')$'
            ),
            /* deleteOriginalAssets: true, */
            threshold: 0,
            minRatio: 0.8
        })
    ].concat(utils.generateHtmlPlugins({
        templateDir: '../src/html/views',
        minify: true
    }))
})
