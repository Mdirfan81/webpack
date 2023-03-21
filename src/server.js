const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.get("/hello-world", function (req, res) {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/hello-world.html");
  const contentFormHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFormHtmlFile);
});
app.get("/kiwi/", function (req, res) {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/kiwi.html");
  const contentFormHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFormHtmlFile);
});

app.use("/static", express.static(path.resolve(__dirname, "../dist")));

app.listen(3000, function () {
  console.log("Application running on http://localhost:3000");
});
