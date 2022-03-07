const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

const API_URLS = {
    development: 'http://localhost:3000'
};

const API_URL = JSON.stringify(API_URLS[process.env.NODE_ENV]); // must stringify but I'm not sure why!

const config = {
    entry: {
        main: path.resolve(__dirname, './js/script.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    devServer: {
        port: 8086,
        contentBase: path.join(__dirname, 'build/'),
        compress: false,
        historyApiFallback: true,
        publicPath: '/',
        watchOptions: {
            poll: true
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './html/index.html'),
            filename: 'index.html',
            //inject: 'body'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './html/cart.html'),
            filename: 'cart.html',
            chunck: ["main"]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './html/confirmation.html'),
            filename: 'confirmation.html',
            chunck: ["main"]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './html/product.html'),
            filename: 'product.html',
            chunck: ["main"]
        }),
        // Define global variable from NODE_ENV for the app
        new webpack.DefinePlugin({
            DEBUG: process.env.NODE_ENV === "development",
            API_URL
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ["es2015"] }
                },
                exclude: file => (
                    /node_modules/.test(file)
                ),
            },
            {
                test: /\.(html)$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            // https://github.com/webpack-contrib/html-loader
                            interpolate: "require" // can be true to interpolate all or "require" to just interpolate require
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', // creates style nodes from JS strings
                    'css-loader' // translates CSS into CommonJS
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|otf|cur)$/,
                loader: "file-loader"
            },
            // Webpack + Multiple HTML files : https://www.youtube.com/watch?v=y_RFOaSDL8I
            //{
            //    test: /\.html$/,
            //    use: [
            //        {
            //            loader: "file-loader",
            //            options: {
            //                name: '[name].[ext]'
            //            }
            //        }
            //    ],
            //    exclude: path.resolve(__dirname, './html/index.html')
            //},
        ]
    },
    devtool: '#eval-source-map'
};

module.exports = (env, argv) => {

    console.log(`mode = ${argv.mode}, NODE_ENV = ${process.env.NODE_ENV}`);

    return config;
};