const users = [];
// users will be an empty array at the beginning

const addUser = ({id, name, room}) => {
    // Pankhuri Room = pankhuriroom ( trim white spaces and convert lowercase and combine)
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // If the user is already present in the room
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if(existingUser){
        return { error : 'Username is taken' };
    } 

    // push user to the users array
    const user = {id, name, room};
    users.push(user);
    return {user};
}

const removeUser = (id) => {
    //find the user with the particular id
    const index = users.findIndex((user) => user.id===id);

    if(index != -1){
        return users.splice(index,1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id); 

const getUsersInRoom = (room) => users.filter((room) => user.room === room);

module.exports = {addUser, removeUser, getUser, getUsersInRoom};
 