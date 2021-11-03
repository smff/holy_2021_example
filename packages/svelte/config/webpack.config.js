const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
    mode: "none",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: {
                    loader: "svelte-loader",
                    options: {
                        emitCss: true,
                        hotReload: true,
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            svelte: path.resolve("node_modules", "svelte"),
        },
        extensions: [".mjs", ".js", ".svelte"],
        mainFields: ["svelte", "browser", "module", "main"],
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../dist'),
        },
        compress: true,
        port: 9003,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "remoteSvelte",
            filename: "remoteSvelte.js",
            remotes: {},
            exposes: {
                './App': path.resolve(__dirname, '../src/components/SvelteAppExpose')
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