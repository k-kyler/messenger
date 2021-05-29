var users = [];
var getUser = function (id) {
    return users.find(function (user) { return user.id === id; });
};
var getUsersInRoom = function (room) {
    return users.filter(function (user) { return user.room === room; });
};
var addUser = function (_a) {
    var id = _a.id, username = _a.username, room = _a.room;
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();
    var existingUser = users.find(function (user) { return user.room === room && user.username === username; });
    if (existingUser)
        return { error: "Username is already used in this room" };
    var user = { id: id, username: username, room: room };
    users.push(user);
    return { user: user };
};
var deleteUser = function (id) {
    var index = users.findIndex(function (user) { return user.id === id; });
    if (index !== -1)
        return users.splice(index, 1)[0];
};
module.exports = { getUser: getUser, getUsersInRoom: getUsersInRoom, addUser: addUser, deleteUser: deleteUser };
