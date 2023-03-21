//1. Basic Example

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// This come with in webpack-5 in build

module.exports = {
  entry: "./src/index.js",
  output: {
    //contenthash: will cache the code, if any new code added to any file. read the new file or else read old one
    // Ex: We change CSS file then new CSS file will read and (cached)old JS file new read
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "", //we can write this relative path where the images/ assets are present, This will work when we are making a different folder to put our assets when builded the application.
  },
  mode: "production",

  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/inline",
      },
      {
        test: /\.txt/,
        type: "assest/sourse",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
      {
        test: /\.html$/,
        use: "html-loader",
      },
      {
        test: /\.hbs$/,
        use: "handlebars-loader",
      },
    ],
  },
  plugins: [
    // new TerserPlugin(),// No need for this in the production it all ready included
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css", //userDefine
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.hbs",
      title: "Hello World",
      description: "Some description",
    }),
  ],
};
