const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseConfig = require('./webpack.base.conf.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    ie8: true
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: false // 折叠 html 为一行
            }
        })
    ]
})