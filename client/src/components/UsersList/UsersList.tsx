import { FC } from "react";
import "./UsersList.css";
import { userDataType } from "../../pages/ChatArea/ChatArea";
import UserItem from "./UserItem/UserItem";
import { List, Typography, Divider, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

interface IUsersListProps {
    usersData: userDataType[];
    userId: string;
    setOpenUsersList: (open: boolean) => void;
}

const UsersList: FC<IUsersListProps> = ({
    usersData,
    userId,
    setOpenUsersList,
}) => {
    return (
        <div className="usersList">
            <div className="usersList__header">
                <Typography variant="h6" className="usersList__title">
                    Room members
                </Typography>

                <IconButton onClick={() => setOpenUsersList(false)}>
                    <CloseIcon />
                </IconButton>
            </div>

            <Divider />

            {usersData && usersData.length && (
                <List className="usersList__list">
                    {usersData.map((user) => (
                        <UserItem
                            key={user.id}
                            id={user.id}
                            username={user.username}
                            userId={userId}
                        />
                    ))}
                </List>
            )}
        </div>
    );
};

export default UsersList;
