const webpack = require('webpack')
const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config')
const developmentConfig = () => {
    return merge([
        {         
            mode: 'development',
            devServer: {
                historyApiFallback: true,
            },
            devtool: 'cheap-module-source-map',

            plugins: [
                new webpack.DefinePlugin({
                    isDevelopment: true,
                    'process.env': {
                        NODE_ENV: JSON.stringify('development'),
                    },
                }),
            ],
        },
    ])
}
module.exports = () => merge(webpackBaseConfig(), developmentConfig())