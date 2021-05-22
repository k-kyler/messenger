import { FC, useState, useEffect } from "react";
import "./ChatArea.css";
import io from "socket.io-client";

let socket;

interface IChatArea {
    match: {
        params: {
            username: string;
            room: string;
        };
    };
}

const ChatArea: FC<IChatArea> = ({ match }) => {
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");

    const SERVER_URL: string = "http://localhost:5000";

    useEffect(() => {
        const { username, room } = match.params;

        socket = io(SERVER_URL);
        console.log(socket);

        setUsername(username);
        setRoom(room);
    }, [SERVER_URL, match.params]);

    return <div>Chat Area</div>;
};

export default ChatArea;
