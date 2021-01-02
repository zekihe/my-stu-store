const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    mode: "development",
    resolve: {
        "extensions": ['.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                exclude: [
                    path.resolve(__dirname, 'src/components')
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]--[hash:base64:5]'
                            // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                }],
                include: [
                    path.resolve(__dirname, 'src/components')
                ]
            },
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: "./dist",
        port: '8011',
        open: true
    }
}