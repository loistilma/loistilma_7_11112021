const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = () => {
    return merge([
        {
            entry: path.resolve(__dirname, "./src/index"),
            output: {
              path: path.resolve(__dirname, "./dist"),
              filename: "[name].bundle.js",
              chunkFilename: "[name].bundle.js",
              clean: true,
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                        },
                    },
                    {
                        test: /\.scss$/,
                        exclude: /node_modules/,
                        use: [
                            process.env.NODE_ENV === 'production'
                                ? MiniCssExtractPlugin.loader
                                : 'style-loader',
                            'css-loader'
                        ],
                    },
                    {
                        test: /\.(jpg|png|svg)$/,
                        type: 'asset/inline'
                    },
                ],
            },
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                alias: {
                    '@': path.resolve(__dirname, 'src'),
                    '@assets': path.resolve(__dirname, 'src/assets'),
                    '@components': path.resolve(__dirname, 'src/components'),
                    '@layouts': path.resolve(__dirname, 'src/layouts'),
                    '@contexts': path.resolve(__dirname, 'src/contexts'),
                    '@hooks': path.resolve(__dirname, 'src/hooks'),
                    '@pages': path.resolve(__dirname, 'src/pages'),
                    '@utilities': path.resolve(__dirname, 'src/utilities'),
                    '@schemas': path.resolve(__dirname, 'src/schemas'),
                    '@routes': path.resolve(__dirname, 'src/routes'),
                    '@services': path.resolve(__dirname, 'src/services'),
                    '@constants': path.resolve(__dirname, 'src/constants')
                },

            },
            plugins: [
                new HtmlWebpackPlugin({
                    template: './public/index.html',
                    filename: './index.html',
                }),
            ],
        },
    ])
}