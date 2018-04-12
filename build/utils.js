const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')

function cssLoaders(options) {
    options = options || {}

    let cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: options.extract,
            sourceMap: options.sourceMap,
            importLoaders: 1
            // modules: true
        }
    }
    let resolveUrlLoader = {
        loader: 'resolve-url-loader'
    }
    let postcssLoader = {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            sourceMap: options.sourceMap,
            plugins: [
                require('postcss-import'),
                require('postcss-url'),
                require('postcss-cssnext')
            ]
        }
    }

    function generateLoaders(loader) {
        let loaders = [cssLoader, postcssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: {
                    sourceMap: options.sourceMap
                }
            })
        }

        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                publicPath: '../',
                fallback: 'style-loader'
            })
        } else {
            return ['style-loader'].concat(loaders)
        }
    }

    return {
        css: generateLoaders(),
        scss: generateLoaders('sass')
    }
}

exports.generateHtmlPlugins = function (options) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, options.templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${options.templateDir}/${name}.${extension}`),
            inject: true,
            minify:
                options.minify
                    ? {removeComments: true,
                       collapseWhitespace: true,
                       removeAttributeQuotes: true}
                    : false
        })
    })
}

exports.styleLoaders = function (options) {
    const output = []
    const loaders = cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }

    return output
}
