const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const chalk = require('chalk')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// happypack
const HappyPack = require('happypack')
const os = require('os') // 获取电脑的处理器有几个核心，作为配置传入
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin')

// config
const utils = require('./utils')

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: utils.resolve('dist'),
        filename: 'static/js/[name].[chunkhash].js'
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    },
                    normalizeUnicode: false
                }]
            },
            canPrint: true
        }),
        new copyWebpackPlugin([{
            from: utils.resolve('/static/image'),//打包的静态资源目录地址
            to: utils.resolve('/dist/static/image') //打包到dist下面的public
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: utils.resolve('index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css'
        }),
        new HappyPack({ // 开启多线程打包
            id: 'happy-babel-js',
            loaders: ['babel-loader?cacheDirectory=true'],
            threadPool: happyThreadPool
        }),
        new ProgressBarPlugin({
            format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
        }),
        new webpack.WatchIgnorePlugin([
            /\.cache/
        ]),
        new webpack.LoaderOptionsPlugin({
            options: {
                sanMarkdown: {
                    use: [
                        function (md) {
                            let renderer = md.renderer
                            let renderAttrs = renderer.renderAttrs
                            renderer.rules.table_open = function () {
                                return '<table class="table">'
                            }
                            md.renderer.renderAttrs = function (token) {
                                if (token.nesting === -1) {
                                    return ''
                                }
                                let attrs = token.attrs
                                if (!attrs) {
                                    attrs = token.attrs = []
                                }
                                attrs.push(['class', token.tag])
                                return renderAttrs.call(renderer, token)
                            }
                        }
                    ]
                }
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: [utils.resolve('src'), utils.resolve('loaders'), utils.resolve('libs'), utils.resolve('node_modules/highlight')],
                use: [
                    'happypack/loader?id=happy-babel-js',
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ],
                            plugins: [
                                ['@babel/plugin-transform-runtime'],
                                ['@babel/plugin-transform-modules-commonjs']
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                include: [utils.resolve('src'), utils.resolve('libs')],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer'),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(html|tpl)(\?.*)?$/,
                loader: 'html-loader'
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                include: [utils.resolve('src'), utils.resolve('libs')],
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 2000,
                            publicPath: '/',
                            name: 'static/image/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(svg|ico|woff|eot|ttf)$/,
                include: [utils.resolve('src'), utils.resolve('libs')],
                use: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: 1,
                            publicPath: '/',
                            name: 'static/font/[name]-[hash:8].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.md$/,
                include: [utils.resolve('src')],
                use: [
                    {
                        loader: require.resolve('../loaders/san-markdown-loader')
                    }
                ]
            },
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                enforce: 'pre'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '&': utils.resolve('src'),
            '~': utils.resolve('libs'),
            '@': utils.resolve('libs/components')
        }
    }
}
