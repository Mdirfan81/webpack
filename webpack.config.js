//1. Basic Example

const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    // path: "./dist",// relative path does not work so we are using the path package
    // where defining new absalute path below.
    path: path.resolve(__dirname, "./dist"),
    // publicPath : 'auto'  // is by default and check for the asset present or not.
    publicPath: "dist/", //we can write this relative path where the images/ assets are present, This will work when we are making a different folder to put our assets when builded the application.

    // publicPath:'http://some-cdn.com/' it will help when we are passing any assets from CDN or any external link.
    //this act this way ex:- src:http://some-cdn.com/fileName. this file name we give when we are initializing the src or ex: in the image tag of the html
  },
  mode: "none",

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
    ],
  },
};

//rm -r dist // work in Ubuntu if any error come , use this command.

// 1.assets/resource :- this copy the file in the build folder / generate a new file in the build folder.
// 2.assets/inline:- It make  base 64 representation of our file and bake it direclty into the JS bundle.
// used to importing large files as well, but this will make the size of our JS bundle a lot bigger.
// 3. assets
