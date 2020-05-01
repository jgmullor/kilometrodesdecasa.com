const { DefinePlugin, ProgressPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.[contenthash].js'
    },
    plugins: [
        new ProgressPlugin(),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'images' } // https://github.com/Leaflet/Leaflet/pull/6951
        ]),
        new DefinePlugin({
            MAPBOX_ACCESS_TOKEN: JSON.stringify(process.env.MAPBOX_ACCESS_TOKEN),
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[contenthash].css',
        }),
        new HtmlWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test:/\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(ttf|eot|svg|gif|png)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[contenthash].[ext]',
                        publicPath: '/'
                    },
                    
                }]
            }
        ]
    },
    devServer: {
        https: true,
        port: 443,
        host: 'local.kilometrodesdecasa.com'
    }
};
