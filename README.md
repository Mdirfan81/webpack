# Webpack - Learning
> Learning about the webpack
![A image](https://cdn.iconscout.com/icon/free/png-256/webpack-1-1174980.png )


<!-- this site was build using [Google](https://www.google.com/). -->
### 1. What is Webpack ?
> Webpack was designed to help you bundle all your dependencies into one or more files.

> Dependencies are other JS modules that your main JS file requires in order to do its JOB.

> We can import SASS, LESS, handlebars, XML, JS, JSX and so much more!
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

***3. asset/source module type***
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

###Loaders
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


<!-- BASICS -->
- for bullets.
1.ordered List
  - nested list
  
  #Todo
  - [x] # Marked check list #1
  - [ ] need to complet :tada: `#0969DA`
  
  <!-- Comments -->
  
  **this is bold**
