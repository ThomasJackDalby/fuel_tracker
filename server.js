var app = require("./src/app.js");
var http = require("http");
var server = http.createServer(app);

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    console.log("Node NOT Exiting...");
});

const port = process.env.PORT || 1337;
app.set('port', port);
server.listen(port);