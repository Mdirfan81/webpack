# Webpack - Learning
> Learning about the webpack
![A image](https://cdn.iconscout.com/icon/free/png-256/webpack-1-1174980.png )


<!-- this site was build using [Google](https://www.google.com/). -->
### 1. What is Webpack ?
> Webpack was designed to help you bundle all your dependencies into one or more files.

> Dependencies are other JS modules that your main JS file requires in order to do its JOB.

> We can import SASS, LESS, handlebars, XML, JS, JSX and much more!
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
***2. asset/inline***
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

***3. asset***

> Where the first one is used for Large Files.
> and the seconid one is used for small files.
> It depends on your specific situatin.
```ruby
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
      },
    ],
  }
```
> Webpack will make this decision based on the size of each file weather to make a ***copy in build folder*** or ***encode (Base 64) into the file***.

> If the file size is ***more than*** **8 KB**, this file will be treated as a ***resource asset***

> If the file size is ***less than*** **8 KB**, this file will be treated as a ***inline asset***

>If we want change the limit of **8 KB** to any thing, We can do it by
```ruby
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parser:{
        dataUrlCondition:{
        maxSize: 3 * 1024 // 3 kilobytes
        },
        },
      },
    ],
  }
```
> Here we are setting a **limit to 3 KB**, if the file size if more then **3KB** it will be treated as ***Resource asset*** Else ***Inline asset***.

***4. asset/source module type***
```
Here we are importing a data from another file altText.txt, file contant***KIWI ALT DATA***
and Importing that **Text file** in our add-image.js file (import altData from altText.txt) applying the text in alt of the img
```
> This means that Webpack will read the contents of the text file and give us a JS string with those contents.
```ruby
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parse: {
          dataUrlCondition: {
            maxSize: 3 * 1024, //3 kiloytes
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
        //this make it text inline
      },
    ],
  }
```

### Loaders
> Loaders are used when we need to import different files, when we need to import CSS file etc,.

> Allows to import all type of file which assest does not allow us.

> In this we are seeing to import CSS file in our Porject.

### Example to load ***CSS** in our project
```ruby
Here we added a Class in component/helloWorldButton/hellowWorldButton.js

import "./helloWorldButton.css";

class HelloWorldButton {
  render() {
    let button = document.createElement("button");
    button.innerHTML = "Hello Word";
    button.classList.add("hello-world-button");
    button.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello world";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };
    const body = document.querySelector("body");
    body.appendChild(button);
  }
}

export default HelloWorldButton;

```
```ruby
Here we also added a CSS file in component/helloWorldButton/hellowWorldButton.css

.hello-world-button {
  font-size: 20px;
  padding: 7px 15px;
  background: green;
  color: white;
  outline: none;
}
.hello-world-text {
  color: green;
  font-weight: bold;
}
```
> We can call this ***Render Function*** in our index.js File

```ruby
import HelloWorldButton from "./components/helloWorldButton/helloWorldButton";
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

```

> Adding ***New Rule*** in Webpack to load the css file.
```ruby
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        type: "asset",
        parse: {
          dataUrlCondition: {
            maxSize: 3 * 1024, //3 kiloytes
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
        //this make it text inline
      },
      {
      test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  }
```
 >  ***use*** is used to write more then one type.
  > Combine multiple rule in one.
  > Every Webpack loader comes as NPM package that
  > You can add as a dependency to our application.
  > in this case need to install 2 packages, style loader and CSS loader.
   ```ruby
   npm i css-loader style-loader --save-dev
   ```
   >  We can see the result that the ***CSS*** is inject in **HTML head**
  
![Showing the result](https://user-images.githubusercontent.com/60057329/224952745-5c9b5357-6249-4b97-94de-ed9cf93d3ab8.png)

> We can also add ***SASS***

> It read from ***right to left***.


```ruby
   {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
   }
  ```
  
  > npm i @babel/core babel-loader @babel/preset-env --save-dev
  > HERE installing needed plugin in our JS Project
  
```ruby
 {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
  ```

### 4. Plugins
```
Plugins are additional JS libraries that do everything that loaders cannot do.
Plugins can also modify how the bundles themselves are creates
Ex: uglifyJSplugin takes the bundle.js and minimizes the contents to decrease the bundle size
```
> We can modify ***resulting bundles so it consumes less space on disk*** and is faster to download.

1. ***Tercer Plugin***
> Used to minify the bundle size, This Package comes within **Webpacke-5** ***No Need To Install***

```ruby

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/", //we can write this relative path where the images/ assets are present, 
  },
  mode: "none",

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
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
    ],
  },
  plugins: [new TerserPlugin()],
};
```
1. ***Making CSS file in Seperate File using mini-css-extract-plugin***
> We have already bundled the css in common file using **style-loader** etc, but it is not good for production application

> By seprating the different file, all file size decreases, ***The performance will increase***

> This will allow us to load multiple files in parallel, making overall experience even better.

```ruby
const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/", //we can write this relative path where the images/ assets are present, 
  },
  mode: "none",

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
    ],
  },
  plugins: [new TerserPlugin(),
  new MiniCssExtractPlugin({
      filename: "styles.css", //This styles.css file will be in dist folder.
    }),
  ],
};
```
> After building we can link the **CSS** file into out **HTML file**.
> So all the CSS will be in ***styles.css file***

> We can see the result, inline css is removed and file link will come. ALL THE CSS FROM DIFFERENT FILE WILL AUTOMATICALLY COME TO COMMON FILE.

![Minify the Css](https://user-images.githubusercontent.com/60057329/225027183-0ed5547e-7445-407d-baf4-34760b9a2248.png)

### 5. Browser Caching
> Every time our browser loads a website, it downloads all the assets required by the websites. when ever browser reload it download the resourses.

> This may becomes an issue, especially if your customers browse your website using mobile devices with slow internet connection. Each time they go to a new page, they need to wait several minutes until the page is ready.
> Fortunately, there is a solution to this problem, and it's called **Browser Caching**

> If the file didn't change between the page reloads, your browser can save it in a specific place, this place is called **cache**.

> when you open this page again, browser wont download this file. This techinque helps to save lots of time and internet traffic.

> But also cause a issue, Ex: If developer add new code or fix a bug, the browser this never read new code.

> For solving above problem, when ever we make any changes to code we will add the file with ***new file name***. where the browser store the onle Filename, ***IT WILL SEE IF THE FILE WITH NEW NAME THEN READ NEW FILE ELSE READ OLD ONE (CACHED ONE)***
>  **Webpack will automatically handle this (auto generate new file names)** .


```ruby
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.[contenthash].js", <---
    path: path.resolve(__dirname, "./dist"),
    publicPath: "dist/", //we can write this relative path where the images/ assets are present, 
  },
  mode: "none",
  plugins: [new TerserPlugin(),
  new MiniCssExtractPlugin({
      filename: "styles.[contenthash].css", <---//This styles.css file will be in dist folder.
    }),
  ],
};
```

> Only need to add ***[contenthash]*** before any filename.
> ***SEE THE FILE TREE***

> Any new JS code update or added then a new JS file creates in dist folder, if CSS code add then CSS new file will added to dist folder.

![bundle](https://user-images.githubusercontent.com/60057329/225050891-d759b893-a2f1-4e0a-ae20-42bc3e335635.png)

### 6. Clean Dist Folder Before Generating New Bundles.

```ruby
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

    plugins: [
        new CleanWebpackPlugin(),
    ],

```
> This ***delete all the previews file*** in dist folder whenever we build again.





<!-- BASICS -->
- for bullets.
1.ordered List
  - nested list
  
  #Todo
  - [x] # Marked check list #1
  - [ ] need to complet :tada: `#0969DA`
  
  <!-- Comments -->
  
  **this is bold**
