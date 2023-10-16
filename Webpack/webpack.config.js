const path = require("path");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const lightningcss = require('lightningcss');
const browserslist = require('browserslist');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin({
                minify: CssMinimizerPlugin.lightningCssMinify,
                minimizerOptions: {
                    targets: lightningcss.browserslistToTargets(browserslist())
                },
            }),
            new TerserPlugin(),
        ],
    },
    output: {
        path: path.join(__dirname, "../yourHubspotProjectName/dist"), /* hubspot project name here */
        clean: true,
        publicPath: '/dist/',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/,
                use: [
                    require.resolve('css-loader'),
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-import'),
                                    require('tailwindcss/nesting'),
                                    require('tailwindcss'),
                                ],
                            },
                        },
                    }
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                exclude: /node_modules/,
                type: "asset/inline",
            },
            {
                test: /\.svg/,
                exclude: /node_modules/,
                type: "asset/inline",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                exclude: /node_modules/,
                type: "asset/inline",
            },
        ],
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,   /* limit chunks because hubspot cant load modules */
        }),
        new HtmlBundlerPlugin({
            entry: {
                masterLinks: './src.html',
            },
            js: {
                filename: 'assets/js/[name].[contenthash:8].js',
            },
            ts: {
                filename: 'assets/js/[name].[contenthash:8].js',
            },
            css: {
                filename: 'assets/css/[name].[contenthash:8].css',
            },
        }),
        new StylelintPlugin({
            context: path.resolve(__dirname, "../Content/Css/"),
            extensions: ["css"],
            fix: true,
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, "../Scripts/"),
            extensions: ["js"],
            fix: true,
        }),
    ],
};
