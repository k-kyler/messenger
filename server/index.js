var express = require("express");
var cors = require("cors");
var socketio = require("socket.io");
var http = require("http");
var port = process.env.PORT || 5000;
var app = express();
var server = http.createServer(app);
var io = socketio(server);
app.use(cors());
app.use(express.json());
app.get("/", function (req, res) {
    res.send("Hello");
});
io.on("connection", function (socket) {
    console.log("New connection");
    socket.on("disconnect", function () {
        console.log("User has left");
    });
});
server.listen(port, function () { return console.log("Server is running at " + port); });
