//1. Basic Example

const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// This come with in webpack-5 in build

module.exports = {
  entry: { "hello-world": "./src/index.js", kiwi: "./src/kiwi.js" },
  output: {
    //contenthash: will cache the code, if any new code added to any file. read the new file or else read old one
    // Ex: We change CSS file then new CSS file will read and (cached)old JS file new read
    filename: "[name].bundle.js",
    // path: "./dist",// relative path does not work so we are using the path package
    // where defining new absalute path below.
    path: path.resolve(__dirname, "./dist"),
    // publicPath : 'auto'  // is by default and check for the asset present or not.
    publicPath: "", //we can write this relative path where the images/ assets are present, This will work when we are making a different folder to put our assets when builded the application.
    // clean:true,
    // clean: {
    // dry: true, // Webpack will tell you which files it's going to remove insetead of actaully removing them,
    // keep: /\.css/, // option tells webpack which files it should keep when cleaning the list folder.
    // this is telling to keep the CSS files and delete the other files.
    // },
    // publicPath:'http://some-cdn.com/' it will help when we are passing any assets from CDN or any external link.
    //this act this way ex:- src:http://some-cdn.com/fileName. this file name we give when we are initializing the src or ex: in the image tag of the html
  },
  mode: "development",
  // mode: "none",
  devServer: {
    port: 9000, //specify a port on which this server will be running
    static: {
      directery: path.resolve(__dirname, "./dist"), //the server what exactly should be served on that board here.
    },
    devMiddleware: {
      // this tell which file to use as root / entry point.
      index: "index.html",
      writeToDisk: true, // By default webpack generate files in memory and doesn't save them to disk.
      // In this case, your list folder is going to be empty,
      // even though the application would be available.
    },
  },

  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/inline",
        // type: "asset/resource",
        // this asset/resource will copy image file to dist folder.
        // type: "asset",
        // asset will put the path of the image to file, ONLY.
      },
      {
        test: /\.txt/,
        type: "assest/sourse",
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader"],
        use: [MiniCssExtractPlugin.loader, "css-loader"],
        // this use is used to write more then one type.
        // Combine multiple rule in one.
        // Every Webpack loader comes as NPM package that
        // You can add as a dependency to your application.
        //in this case need to install 2 packages, style loader and CSS loader.
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        //it load from right to left.
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
            //here we plugin installing needed stuff in out JS project.
            //npm i @babel/core babel-loader @babel/preset-env
            // --save-dev
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
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css", //userDefine
    }),
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: "./src/page-template.hbs",
      title: "Kiwi",
      description: "KIWI description",
      filename: "Kiwi.html",
      chunks: ["Kiwi"],
    }),
  ],
};

//rm -r dist // work in Ubuntu if any error come , use this command.

// 1.assets/resource :- this copy the file in the build folder / generate a new file in the build folder.
// 2.assets/inline:- It make  base 64 representation of our file and bake it direclty into the JS bundle.
// used to importing large files as well, but this will make the size of our JS bundle a lot bigger.
// 3. assets
