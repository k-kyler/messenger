import { FC } from "react";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";
import { StyledBadge } from "../../../pages/ChatArea/ChatArea";

interface IUserItemProps {
    id: string;
    username: string;
    userId: string;
}

const UserItem: FC<IUserItemProps> = ({ id, username, userId }) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    variant="dot"
                >
                    <Avatar />
                </StyledBadge>
            </ListItemAvatar>

            {id === userId ? (
                <ListItemText primary={`${username} (You)`} />
            ) : (
                <ListItemText primary={username} />
            )}
        </ListItem>
    );
};

export default UserItem;
