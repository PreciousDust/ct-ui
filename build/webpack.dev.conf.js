const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const baseConfig = require('./config.js')

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        // 本地环境地址配置
        contentBase: '../dist',
        publicPath: '/',
        host: baseConfig.dev.host,
        compress: true,
        port: baseConfig.dev.port,
        noInfo: true,
        // 开启调试, 可在移动端等同wifi环境下 ip访问
        disableHostCheck: true
    }
})

module.exports = webpackConfig