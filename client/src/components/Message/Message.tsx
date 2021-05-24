import { FC } from "react";
import "./Message.css";
import { Avatar, Card, CardContent, Typography } from "@material-ui/core";

interface IMessage {
    username: string;
    text: string;
}

const Message: FC<IMessage> = ({ username, text }) => {
    return (
        <div className="message">
            <Avatar />
            <div className="message__body">
                <Typography variant="body2" className="message__username">
                    {username}
                </Typography>
                <Card className="message__card ">
                    <CardContent>
                        <Typography variant="body1">{text}</Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Message;
