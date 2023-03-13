# Webpack - Learning
> Learning about the webpack
![A image](https://cdn.iconscout.com/icon/free/png-256/webpack-1-1174980.png )


<!-- this site was build using [Google](https://www.google.com/). -->
### 1. What is Webpack ?
```
Webpack is a static module bundler for JavaScript applications that takes all of your code and turns it into something that 
can be used in a web browser. Modules are reusable bits of code made up of JavaScript, node modules, images, and 
CSS styles that are bundled and ready to use in your website.
```

### 2. Basic Webpack instructions

```ruby
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "none",
};
```
- **Entry** : *Define the Entry Point, root file of the project.*
- **Output** : *filename is user-defined we can name it anything.
path and folder name **/dist**.* 
- **Mode** : *we are not defining any mode here. Mode like **Development** , **UAT** and **Production**.* 
#### common command to ***RUN THE SCRIPT***
1. npx webpack
> Used to run the script where it creates a **/dist** folder with **bundle.js** file.
2. npx webpack --stats detailed
> Using this can view all the information

### 3. Assets
```
It helps us to insert the images in our project
We can insert by using 3 types namely,
```
1. asset/resource
2. asset/inline
3. asset

***1. asset/resource***
```ruby
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "none",
   module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
    ],
  },
};
```
![webpack-1](https://user-images.githubusercontent.com/60057329/224719618-e8a7e202-c483-4fc8-9ea1-90ddd09a7392.png)

> As showen in picture we can see the image is present in the dist folder, By using this method the assets will copied to dist folder

#### *publicPath*
> It will help when we are passing any assets from CDN or any external link.
```ruby
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    
    //publicPath: "auto" By default it is AUTO
    publicPath: "http://some-cdn.com/"
   
  },
  mode: "none",
   module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/resource",
      },
    ],
  },
};
```
>   ***publicPath: "http://some-cdn.com/"*** we have added, so path will be
```ruby
<img src="http://some-cdn.com/image-name.jpg" alt="testing" />
```
***1. asset/inline***
```ruby
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset/inline",
      },
    ],
  }
```
> It make **64-base** representation of our asset and make it direclty into the JS bundle. While importing large files make the size of our JS bundle a lot bigger.

```ruby
npx webpack --stats detailed
```
> You can see the bundle size and extra information using this command.
![Showing 64bit image encoded](https://user-images.githubusercontent.com/60057329/224730236-932c35b1-a660-4e9b-9282-ad32dfc8d8e2.png)
> Can see the image where the image is encoded ***inline*** only















<!-- BASICS -->
- for bullets.
1.ordered List
  - nested list
  
  #Todo
  - [x] # Marked check list #1
  - [ ] need to complet :tada: `#0969DA`
  
  <!-- Comments -->
  
  **this is bold**
