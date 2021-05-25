import { FC, useState, useEffect, FormEvent } from "react";
import "./ChatArea.css";
import io from "socket.io-client";
import {
    Paper,
    Avatar,
    Typography,
    IconButton,
    Badge,
    FormControl,
    TextField,
} from "@material-ui/core";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import ForumIcon from "@material-ui/icons/Forum";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import Message from "../../components/Message/Message";

interface IChatArea {
    match: {
        params: {
            username: string;
            room: string;
        };
    };
}

type messageType = {
    id: string;
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
    const [messages, setMessages] = useState<messageType[]>([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState("");

    const SERVER_URL: string = "http://localhost:5000";

    const setInputHandler = (value: string) => {
        setInput(value);
    };

    const sendMessageHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (input) {
            socket.emit("Send message", input, () => setInput(""));
        }
    };

    useEffect(() => {
        const { username, room } = match.params;

        setUsername(username);
        setRoom(room);

        socket = io(SERVER_URL);
        socket.emit(
            "Join room",
            {
                username,
                room,
            },
            () => {}
        );
        socket.on("User id", (userId: string) => {
            setUserId(userId);
        });

        return () => {
            socket.emit("disconnect");
            socket.off();
        };
    }, [SERVER_URL, match.params]);

    useEffect(() => {
        socket.on("Render message", (message: messageType) => {
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
                        <Avatar className="chatArea__roomIcon">
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
                <div className="chatArea__messages">
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            id={message.id}
                            username={message.username}
                            text={message.text}
                            userId={userId}
                        />
                    ))}
                </div>

                <form onSubmit={sendMessageHandler} className="chatArea__form">
                    <FormControl className="chatArea__formControl">
                        <TextField
                            className="chatArea__input"
                            label="Send a message..."
                            variant="outlined"
                            onChange={(event) =>
                                setInputHandler(event.target.value)
                            }
                            value={input}
                        />
                        <IconButton
                            className="chatArea__button"
                            disabled={!input}
                            color="primary"
                            type="submit"
                        >
                            <SendIcon />
                        </IconButton>
                    </FormControl>
                </form>
            </div>
        </Paper>
    );
};

export default ChatArea;
