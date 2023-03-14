import helloWorld from "./hello-world";
import addImage from "./addImage";
import HelloWorldButton from "./components/helloWorldButton/helloWorldButton";
import Heading from "./components/heading/heading";
// helloWorld();
// addImage();

const header = new Heading();
header.render();

let ten = 10;
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
