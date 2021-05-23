import { FC, useState, useEffect } from "react";
import "./ChatArea.css";
import io from "socket.io-client";
import {
    Paper,
    Avatar,
    Typography,
    IconButton,
    Badge,
    TextField,
} from "@material-ui/core";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import ForumIcon from "@material-ui/icons/Forum";
import CloseIcon from "@material-ui/icons/Close";
import RedditIcon from "@material-ui/icons/Reddit";
import SendIcon from "@material-ui/icons/Send";

interface IChatArea {
    match: {
        params: {
            username: string;
            room: string;
        };
    };
}

type messageType = {
    username: string;
    text: string;
};

const StyledBadge = withStyles((theme: Theme) =>
    createStyles({
        badge: {
            backgroundColor: "#44b700",
            color: "#44b700",
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            "&::after": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                border: "1px solid currentColor",
            },
        },
    })
)(Badge);

let socket: any;

const ChatArea: FC<IChatArea> = ({ match }) => {
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([{}]);

    const SERVER_URL: string = "http://localhost:5000";

    useEffect(() => {
        const { username, room } = match.params;

        setUsername(username);
        setRoom(room);

        socket = io(SERVER_URL);
        socket.emit("Join room", {
            username,
            room,
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [SERVER_URL, match.params]);

    useEffect(() => {
        socket.on("Chatbot message", (message: messageType) => {
            setMessages([...messages, message]);
        });
    }, [messages]);

    return (
        <Paper className="chatArea" elevation={2}>
            <div className="chatArea__header">
                <div className="chatArea__room">
                    <StyledBadge
                        overlap="circle"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        variant="dot"
                    >
                        <Avatar>
                            <ForumIcon />
                        </Avatar>
                    </StyledBadge>

                    <Typography variant="body1">{room}</Typography>
                </div>
                <IconButton className="chatArea__outRoom">
                    <CloseIcon />
                </IconButton>
            </div>

            <div className="chatArea__body">
                <div className="chatArea__messages"></div>

                <div className="chatArea__sendMessage">
                    <TextField />
                    <SendIcon />
                </div>
            </div>
        </Paper>
    );
};

export default ChatArea;
