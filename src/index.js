const enforeNodePath = require("enforce-node-path");
enforeNodePath(__dirname);

const app = require("app");
app.start();

console.log("Hello World");