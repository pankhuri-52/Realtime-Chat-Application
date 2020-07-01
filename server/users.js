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

const removeUser = () => {

}

const getUser = () => {

}

const getUsersInRoom = () => {

}
 