# webpack - Learning
> Learning about the webpack
![A image](https://cdn.iconscout.com/icon/free/png-256/webpack-1-1174980.png)


<!-- this site was build using [Google](https://www.google.com/). -->
### 1. What is Webpack ?
```
Webpack is a static module bundler for JavaScript applications that takes all of your code and turns it into something that 
can be used in a web browser. Modules are reusable bits of code made up of JavaScript, node modules, images, and 
CSS styles that are bundled and ready to use in your website.
```

### 2. Basic Webpack instructions

```
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

### 3. Assets
```
It helps us to insert the images in our project
We can insert by using 3 types namely,
```
1. asset/resource
2. asset/inline
3. asset

***1. asset/resource***
```
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



<!-- BASICS -->
- for bullets.
1.ordered List
  - nested list
  
  #Todo
  - [x] # Marked check list #1
  - [ ] need to complet :tada: `#0969DA`
  
  <!-- Comments -->
  
  **this is bold**
