'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    context: __dirname,
    output: {
        filename: './bundle.js',
        path: __dirname + '/public/dist'
    },
    entry: './public/app.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }, {
                test: /\.(eot|woff|woff2|ttf|svg|png|gif|jpg)$/,
                loader: 'url-loader?limit=30000&name=./[name]-[hash].[ext]',
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }],
            }, {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            }
        ],
    },
    plugins: [
        new ExtractTextPlugin('./bundle.css')
    ]
};
