import { FC, useState } from "react";
import "./Message.css";
import {
    Avatar,
    Card,
    CardContent,
    Typography,
    Dialog,
    DialogContent,
} from "@material-ui/core";
import RedditIcon from "@material-ui/icons/Reddit";

interface IMessage {
    id: string;
    username: string;
    text: string;
    userId: string;
    imageSrc?: string;
    videoSrc?: string;
}

const Message: FC<IMessage> = ({
    id,
    username,
    text,
    userId,
    imageSrc,
    videoSrc,
}) => {
    const [imagePreviewDialog, setImagePreviewDialog] = useState(false);

    const showImagePreviewHandler = () => setImagePreviewDialog(true);

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
                        <img
                            src={imageSrc}
                            className="message__image"
                            onClick={showImagePreviewHandler}
                        />

                        <Dialog
                            open={imagePreviewDialog}
                            onClose={() => setImagePreviewDialog(false)}
                        >
                            <DialogContent>
                                <img
                                    src={imageSrc}
                                    className="message__imagePreviewDialog"
                                />
                            </DialogContent>
                        </Dialog>
                    </>
                ) : !text && videoSrc ? (
                    <>
                        <video
                            src={videoSrc}
                            controls
                            className="message__video"
                        ></video>
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
