const path = require('path');
const DIST_PATH = path.resolve(__dirname,'./dist/');
const SRC_PATH = path.resolve(__dirname,'./src/');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    //入口文件
    entry:{
        main: './src/index.js'
    },
    output:{
        path: DIST_PATH,
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
        {
            test: /\.css$/i,
            // use: ['style-loader', 'css-loader'], //从右向左依次处理
            use:[MiniCssExtractPlugin.loader,'css-loader']
        },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/pages/index.html', //模板文件，copy一份到dist,默认生成的文件名index.html
            title: "测试标题",
            inject: 'head',  //默认注入到head
            scriptLoading: 'defer', //文件延迟加载,
            filename: 'hello.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    devServer: {
        contentBase: "./dist",
        hot: true,
        port: 9000,
        index: 'hello.html',
    },
}