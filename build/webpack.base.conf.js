const path = require("path");
const config = require("../config");

module.exports = {
    entry: [
        path.join(__dirname, "..", "src/js/main.js"),
        path.join(__dirname, "..", "src/scss/main.scss")
    ],
    output: {
        path:
            process.env.NODE_ENV === "production"
                ? config.prod.assetsRoot
                : config.dev.assetsRoot,
        filename: "js/main.js",
        publicPath:
            process.env.NODE_ENV === "production"
                ? config.prod.assetsPublicPath
                : config.dev.assetsPublicPath
    },
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: '[name].[ext]',
                    outputPath: 'img/'
                    // publicPath: '../img/'
                    // useRelativePath: process.env.NODE_ENV === "production"
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "file-loader",
                options: {
                    limit: 10000,
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: '../fonts/'
                    // useRelativePath: process.env.NODE_ENV === "production"
                }
            },
            {
                test: /\.html$/,
                include: path.resolve(__dirname, '../src/html/includes'),
                use: ['raw-loader']
            },
        ]
    }
};
