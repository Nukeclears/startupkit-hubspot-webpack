const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");

module.exports = {
    entry: {
        index: "./scripts/Index.js",
        stylesheet: "./scripts/Styles.js",
        alpinejs: "./scripts/AlpineJS/index.js",
    },
    mode: "production",
    output: {
        path: path.join(__dirname, "../../yourHubspotProjectName/dist"), /* hubspot project name here */
        filename: "[name].js",
        chunkFilename: "[name].js",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                include: [
                    path.resolve(__dirname, "../scripts/"),
                ],
                use: {
                    loader: require.resolve("babel-loader"),
                },
            },
            {
                test: /\.tsx?$/,
                include: [
                    path.resolve(__dirname, "../scripts/"),
                ],
                loader: require.resolve("ts-loader"),
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    require.resolve('css-loader'),
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('postcss-import'),
                                    require('tailwindcss/nesting'),
                                    require('tailwindcss'),
                                    require('autoprefixer'),
                                    require("cssnano")()
                                ].filter(Boolean),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                include: path.resolve(__dirname, "../Content/"),
                type: "asset/resource",
            },
            {
                test: /\.svg/,
                include: path.resolve(__dirname, "../Content/"),
                type: "asset/inline",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                include: path.resolve(__dirname, "../Content/"),
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        new webpack.optimize.LimitChunkCountPlugin({
            maxChunks: 1,   /* limit chunks because hubspot cant load modules */
        }),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false,
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new StylelintPlugin({
            context: path.resolve(__dirname, "../Content/css"),
            extensions: ["scss", "css"],
            fix: true,
        }),
        new ESLintPlugin({
            context: path.resolve(__dirname, "../scripts"),
            extensions: ["js"],
            fix: true,
        }),
    ],
};
