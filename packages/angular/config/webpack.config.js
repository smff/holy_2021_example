const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: "none",
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/i,
                use: ["ts-loader"],
            }
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        compress: true,
        port: 9002,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "remoteAngular",
            filename: "remoteAngular.js",
            remotes: {},
            exposes: {
                './App': path.resolve(__dirname, '../src/components/AngularAppExpose')
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