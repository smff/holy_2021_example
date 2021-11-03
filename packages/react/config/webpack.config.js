const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: "none",
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        compress: true,
        port: 9001,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "remoteReact",
            filename: "remoteReact.js",
            remotes: {},
            exposes: {
                './App': path.resolve(__dirname, '../src/components/ReactAppExpose')
            },
            shared: {
                "dom-pubsub": {
                    singleton: true,
                    requiredVersion: "^0.1.0"
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/static/index.html'),
        })
    ]
};