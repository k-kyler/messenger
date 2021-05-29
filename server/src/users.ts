interface IUsers {
    id: string;
    username: string;
    room: string;
}

type addUserTypes = {
    id: string;
    username: string;
    room: string;
};

let users: IUsers[] = [];

const getUser = (id: string) => {
    return users.find((user) => user.id === id);
};

const getUsersInRoom = (room: string) => {
    return users.filter((user) => user.room === room);
};

const addUser = ({ id, username, room }: addUserTypes) => {
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(
        (user) => user.room === room && user.username === username
    );

    if (existingUser) return { error: "Username is already used in this room" };

    const user = { id, username, room };

    users.push(user);

    return { user };
};

const deleteUser = (id: string) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) return users.splice(index, 1)[0];
};

module.exports = { getUser, getUsersInRoom, addUser, deleteUser };
