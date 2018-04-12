const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('../config')

const env = config.dev.env
const host = config.dev.host
const port = config.dev.port

module.exports = merge(baseConf, {
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only',
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        host: host,
        port: port
    },
    module: {
        rules: utils.styleLoaders({sourceMap: true})
    },
    plugins: [
        new ExtractTextPlugin({
            filename: config.dev.stylePath,
            allChunks: true
        }),
        new webpack.WatchIgnorePlugin([
            path.join(__dirname, 'node_modules')
        ]),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: ['You appication is running here http://localhost:8080'],
                notes: ['Some additionsl notes to be displayed unpon successful compilatioin']
            },
            // onErrors: function (severity, errors) {
            //   console.log('severity = ', severity)
            //   console.log('errors = ', errors)
            // },
            clearConsole: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': env
        })
    ].concat(utils.generateHtmlPlugins({
        templateDir: '../src/html/views',
        minify: false
    }))
})
