type usersMethodsTypes = {
    getUser;
    getUsersInRoom;
    addUser;
    deleteUser;
};

type addUserType = {
    user: {
        id: string;
        username: string;
        room: string;
    };
    error: string;
};

type userType = {
    id: string;
    username: string;
    room: string;
};

const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const http = require("http");
const routes = require("./routes");
const usersMethods: usersMethodsTypes = require("./users");

const port = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: "https://messimple-05.netlify.app/",
        methods: ["GET", "POST"],
    },
});

app.use(cors());
app.use(express.json());
app.use(routes);

io.on("connection", (socket) => {
    socket.on("Join room", ({ username, room }, callback: Function) => {
        const { user, error }: addUserType = usersMethods.addUser({
            id: socket.id,
            username,
            room,
        });

        if (error) return callback(error);

        socket.join(user.room);
        socket.emit("User id", user.id);
        socket.emit(
            "Render message",
            {
                username: "Chatbot",
                text: `Hi ${user.username}, welcome to room ${user.room}`,
            },
            usersMethods.getUsersInRoom(user.room)
        );
        socket.broadcast.to(user.room).emit(
            "Render message",
            {
                username: "Chatbot",
                text: `${user.username} has joined the room`,
            },
            usersMethods.getUsersInRoom(user.room)
        );

        callback();
    });

    socket.on("Send message", (message: string, callback: Function) => {
        const user: userType = usersMethods.getUser(socket.id);

        io.to(user.room).emit(
            "Render message",
            {
                id: user.id,
                username: user.username,
                text: message,
            },
            usersMethods.getUsersInRoom(user.room)
        );

        callback();
    });

    socket.on("disconnect", () => {
        const user: userType = usersMethods.deleteUser(socket.id);

        if (user) {
            io.to(user.room).emit(
                "Render message",
                {
                    username: "Chatbot",
                    text: `${user.username} has left the room`,
                },
                usersMethods.getUsersInRoom(user.room)
            );
        }
    });
});

server.listen(port, () => console.log(`Server is running at ${port}`));
