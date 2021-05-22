const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello");
});

io.on("connection", (socket) => {
    console.log("New connection");

    socket.on("disconnect", () => {
        console.log("User has left");
    });
});

server.listen(port, () => console.log(`Server is running at ${port}`));
