const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: "none",
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js',
        publicPath: "http://localhost:9000/"
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        compress: true,
        port: 9000,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ]
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'host',
            filename: "remoteEntry.js",
            remotes: {
                remoteReact: `remoteReact@http://localhost:9001/remoteReact.js`,
                remoteAngular: `remoteAngular@http://localhost:9002/remoteAngular.js`,
                remoteSvelte: `remoteSvelte@http://localhost:9003/remoteSvelte.js`,
            },
            exposes: {},
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