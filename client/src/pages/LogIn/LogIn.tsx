import { FC, useState } from "react";
import "./LogIn.css";
import { Link } from "react-router-dom";
import { Typography, TextField, Button, Paper } from "@material-ui/core";
import Logo from "../../assets/messenger-logo.svg";

const LogIn: FC = () => {
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorRoom, setErrorRoom] = useState(false);
    const [errorUsernameText, setErrorUsernameText] = useState("");
    const [errorRoomText, setErrorRoomText] = useState("");
    const [buttonState, setButtonState] = useState(true);

    const usernameInputHandler = (value: string) => {
        if (username && room) setButtonState(false);
        if (value) {
            setErrorUsername(false);
            setErrorUsernameText("");
            setUsername(value);
        } else {
            setUsername("");
            setErrorUsernameText("Username must be filled");
            setErrorUsername(true);
            setButtonState(true);
        }
    };

    const roomInputHandler = (value: string) => {
        if (username && room) setButtonState(false);
        if (value) {
            setErrorRoom(false);
            setErrorRoomText("");
            setRoom(value);
        } else {
            setRoom("");
            setErrorRoomText("Room must be filled");
            setErrorRoom(true);
            setButtonState(true);
        }
    };

    return (
        <Paper className="LogIn" elevation={3}>
            <div className="LogIn__container">
                <img src={Logo} className="LogIn__logo" />

                <Typography variant="h5">Messenger</Typography>

                <TextField
                    error={errorUsername}
                    className="LogIn__textField"
                    variant="standard"
                    label="Username"
                    onChange={(event) =>
                        usernameInputHandler(event.target.value)
                    }
                    helperText={errorUsernameText}
                />
                <TextField
                    error={errorRoom}
                    className="LogIn__textField"
                    variant="standard"
                    label="Room"
                    onChange={(event) => roomInputHandler(event.target.value)}
                    helperText={errorRoomText}
                />

                {buttonState ? (
                    <Button
                        disabled
                        className="LogIn__button"
                        size="large"
                        variant="contained"
                    >
                        Log In
                    </Button>
                ) : (
                    <Button
                        className="LogIn__button"
                        size="large"
                        color="primary"
                        variant="contained"
                        component={Link}
                        to={`/chatarea/${username}/${room}`}
                    >
                        Log In
                    </Button>
                )}
            </div>
        </Paper>
    );
};

export default LogIn;
