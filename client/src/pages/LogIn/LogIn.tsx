import { FC, useState } from "react";
import "./LogIn.css";
import { useHistory } from "react-router-dom";
import {
    Typography,
    TextField,
    Button,
    Paper,
    Container,
    Grid,
} from "@material-ui/core";
import Logo from "../../assets/messenger-logo.svg";

const LogIn: FC = () => {
    const [room, setRoom] = useState("");
    const [username, setUsername] = useState("");
    const [errorUsername, setErrorUsername] = useState(false);
    const [errorRoom, setErrorRoom] = useState(false);
    const [errorUsernameText, setErrorUsernameText] = useState("");
    const [errorRoomText, setErrorRoomText] = useState("");
    const [buttonState, setButtonState] = useState(true);

    const history = useHistory();

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

    const logInHandler = () => {
        if (username.length > 20) {
            setErrorUsernameText("Username is more than 20 characters");
            setErrorUsername(true);
        }
        if (room.length > 20) {
            setErrorRoomText("Room is more than 20 characters");
            setErrorRoom(true);
        }
        if (username.length <= 20 && room.length <= 20) {
            setErrorRoom(false);
            setErrorRoomText("");
            setErrorUsernameText("");
            setErrorUsername(false);
            setButtonState(false);

            history.push(`/chat/${username}/${room}`);
        }
    };

    return (
        <Container className="LogIn">
            <Grid
                container
                justify="center"
                alignItems="center"
                className="LogIn__center"
            >
                <Paper className="LogIn__paper" elevation={3}>
                    <div className="LogIn__container">
                        <img src={Logo} className="LogIn__logo" />

                        <Typography variant="h5">Messimple</Typography>

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
                            onChange={(event) =>
                                roomInputHandler(event.target.value)
                            }
                            helperText={errorRoomText}
                        />

                        {buttonState ? (
                            <Button
                                disabled
                                className="LogIn__button"
                                size="large"
                                variant="contained"
                            >
                                Join
                            </Button>
                        ) : (
                            <Button
                                onClick={logInHandler}
                                className="LogIn__button"
                                size="large"
                                color="primary"
                                variant="contained"
                            >
                                Join
                            </Button>
                        )}
                    </div>
                </Paper>
            </Grid>
        </Container>
    );
};

export default LogIn;
