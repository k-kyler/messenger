import { FC, useState, useEffect, useRef, FormEvent, MouseEvent } from "react";
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
    Dialog,
    Grid,
    Tooltip,
    Drawer,
    Container,
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from "@material-ui/core";
import { Theme, withStyles, createStyles } from "@material-ui/core/styles";
import GroupIcon from "@material-ui/icons/Group";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SendIcon from "@material-ui/icons/Send";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import Picker, { IEmojiData } from "emoji-picker-react";
import ListIcon from "@material-ui/icons/List";
import Message from "../../components/Message/Message";
import UsersList from "../../components/UsersList/UsersList";

interface IChatArea {
    match: {
        params: {
            username: string;
            room: string;
        };
    };
}

export type userDataType = {
    id: string;
    username: string;
    room: string;
};

type messageType = {
    id: string;
    username: string;
    text: string;
};

export const StyledBadge = withStyles((theme: Theme) =>
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
    const [messages, setMessages] = useState<messageType[]>([]);
    const [input, setInput] = useState("");
    const [userId, setUserId] = useState("");
    const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | any>();
    const [dialogState, setDialogState] = useState(false);
    const [openUsersList, setOpenUsersList] = useState(false);
    const [usersData, setUsersData] = useState<userDataType[]>([]);
    const [errorAlert, setErrorAlert] = useState(false);

    const SERVER_URL: string = "http://localhost:5000";

    const messagesEndRef = useRef<HTMLDivElement | any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    const setInputHandler = (value: string) => {
        setInput(value);
    };

    const sendMessageHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (input) {
            socket.emit("Send message", input, () => setInput(""));
        }
    };

    const onEmojiClick = (
        event: MouseEvent<Element, globalThis.MouseEvent>,
        emojiObject: IEmojiData
    ) => {
        setChosenEmoji(emojiObject);
    };

    const dialogHandler = () => {
        setDialogState(true);
    };

    const openUsersListHandler = () => {
        setOpenUsersList(true);
    };

    useEffect(() => {
        const { username, room } = match.params;

        setRoom(room);

        socket = io(SERVER_URL);
        socket.emit(
            "Join room",
            {
                username,
                room,
            },
            (error: string) => {
                if (error) {
                    setErrorAlert(true);
                }
            }
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
        socket.on(
            "Render message",
            (message: messageType, usersDataEmit: userDataType[]) => {
                setMessages([...messages, message]);
                setUsersData(usersDataEmit);
            }
        );
    }, [messages]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, input]);

    useEffect(() => {
        if (chosenEmoji) setInput(input + chosenEmoji.emoji);
    }, [chosenEmoji]);

    return (
        <Container className="chatArea">
            {/* Chat box section */}
            <Grid
                container
                justify="center"
                alignItems="center"
                className="chatArea__center"
            >
                <Grid item md={7}>
                    <Paper className="chatArea__paper" elevation={3}>
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
                                        <GroupIcon />
                                    </Avatar>
                                </StyledBadge>

                                <Tooltip title={room} placement="top-start">
                                    <Typography
                                        className="chatArea__roomName"
                                        variant="body1"
                                    >
                                        {room}
                                    </Typography>
                                </Tooltip>
                            </div>

                            <Tooltip title="Room members" placement="top">
                                <IconButton
                                    onClick={openUsersListHandler}
                                    className="chatArea__usersList"
                                >
                                    <ListIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Exit room" placement="top">
                                <a href="/" className="chatArea__outRoom">
                                    <IconButton>
                                        <ExitToAppIcon />
                                    </IconButton>
                                </a>
                            </Tooltip>
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

                                <div ref={messagesEndRef}></div>
                            </div>

                            <form
                                onSubmit={sendMessageHandler}
                                className="chatArea__form"
                            >
                                <FormControl className="chatArea__formControl">
                                    <TextField
                                        className="chatArea__input"
                                        label="Send a message..."
                                        variant="outlined"
                                        onChange={(event) =>
                                            setInputHandler(event.target.value)
                                        }
                                        value={input}
                                        size="small"
                                    />
                                    <IconButton
                                        color="primary"
                                        onClick={dialogHandler}
                                    >
                                        <InsertEmoticonIcon />
                                    </IconButton>
                                    <IconButton
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
                </Grid>
            </Grid>
            {/* End of chat box section */}

            {/* Emoji dialog section */}
            <Dialog open={dialogState} onClose={() => setDialogState(false)}>
                <Picker
                    onEmojiClick={onEmojiClick}
                    disableAutoFocus={true}
                    native
                />
            </Dialog>
            {/* End of emoji dialog section */}

            {/* Error alert dialog section */}
            <Dialog open={errorAlert} onClose={() => setErrorAlert(false)}>
                <DialogTitle>Invalid username</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your username has already been taken in this room,
                        please try another.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="secondary"
                        autoFocus
                        onClick={() => (window.location.href = "/")}
                    >
                        Go back
                    </Button>
                </DialogActions>
            </Dialog>
            {/* End of error alert dialog section */}

            {/* Users list drawer section */}
            <Drawer
                anchor="right"
                open={openUsersList}
                onClose={() => setOpenUsersList(false)}
            >
                <UsersList
                    usersData={usersData}
                    userId={userId}
                    setOpenUsersList={setOpenUsersList}
                />
            </Drawer>
            {/* End of users list drawer section */}
        </Container>
    );
};

export default ChatArea;
