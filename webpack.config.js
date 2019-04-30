const devMode = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: devMode ? 'development' : 'production',
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: 'app.js',
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        contentBase: './public',
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    module: {
        rules: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-object-rest-spread',
                '@babel/plugin-proposal-class-properties',
                '@babel/transform-runtime']
            }
        },
        {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader'
                ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
        }]
    }
};