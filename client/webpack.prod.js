const webpack = require('webpack')
const { merge } = require('webpack-merge')
// plugins
const TerserPlugin = require('terser-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpackBaseConfig = require('./webpack.config')
const prodConfig = () => {
    return merge([
        {
            mode: 'production',
            optimization: {
                minimize: true,
                runtimeChunk: 'single',
                minimizer: [new TerserPlugin()],
            },
            plugins: [
                //new BundleAnalyzerPlugin(),
                new MiniCssExtractPlugin(),
                new webpack.DefinePlugin({
                    isDevelopment: false,
                    'process.env': {
                        NODE_ENV: JSON.stringify('production'),
                    },
                }),
                new CompressionPlugin(),
            ],
        },
    ])
}
module.exports = () => merge(webpackBaseConfig(), prodConfig())