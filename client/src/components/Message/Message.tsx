import { FC } from "react";
import "./Message.css";
import { Avatar, Card, CardContent, Typography } from "@material-ui/core";
import RedditIcon from "@material-ui/icons/Reddit";

interface IMessage {
    id: string;
    username: string;
    text: string;
    userId: string;
    imageSrc?: string;
}

const Message: FC<IMessage> = ({ id, username, text, userId, imageSrc }) => {
    return (
        <div
            className={`message ${id && id === userId ? "message__user" : ""}`}
        >
            {!id ? (
                <Avatar>
                    <RedditIcon />
                </Avatar>
            ) : id && id !== userId ? (
                <Avatar />
            ) : null}
            <div className="message__body">
                {id === userId ? null : (
                    <Typography variant="body2" className="message__username">
                        {username}
                    </Typography>
                )}

                {!text && imageSrc ? (
                    <>
                        <img src={imageSrc} className="message__image" />
                    </>
                ) : (
                    <>
                        <Card
                            className={`message__card ${
                                !id || (id && id !== userId)
                                    ? "message__cardOther"
                                    : id && id === userId
                                    ? "message__cardUser"
                                    : ""
                            }`}
                        >
                            <CardContent>
                                <Typography variant="body1">{text}</Typography>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </div>
    );
};

export default Message;
