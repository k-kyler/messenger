var express = require("express");
var cors = require("cors");
var socketio = require("socket.io");
var http = require("http");
var routes = require("./routes");
var usersMethods = require("./users");
var port = process.env.PORT || 5000;
var app = express();
var server = http.createServer(app);
var io = socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
app.use(cors());
app.use(express.json());
app.use(routes);
io.on("connection", function (socket) {
    socket.on("Join room", function (_a, callback) {
        var username = _a.username, room = _a.room;
        var _b = usersMethods.addUser({
            id: socket.id,
            username: username,
            room: room,
        }), user = _b.user, error = _b.error;
        if (error)
            return callback(error);
        socket.join(user.room);
        socket.emit("Chatbot message", {
            username: "Chatbot",
            text: "Hi " + user.username + ", welcome to room " + user.room,
        });
        socket.broadcast.to(user.room).emit("Chatbot message", {
            username: "Chatbot",
            text: user.username + " has joined the room",
        });
        callback();
    });
    socket.on("Send message", function (message, callback) {
        var user = usersMethods.getUser(socket.id);
        io.to(user.room).emit("Client message", {
            username: user.username,
            text: message,
        });
        callback();
    });
    socket.on("disconnect", function () {
        console.log("User has left");
    });
});
server.listen(port, function () { return console.log("Server is running at " + port); });
