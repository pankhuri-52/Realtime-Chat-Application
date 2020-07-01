const express = require('express');
const socketio = require('socket.io'); //real-time
const http = require('http'); //http is slow as compared to socket.io

//import all the helper functions of users from users.js
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
//instance of socketio
//to make socket.io working
const io = socketio(server);

//Socket.io code
// this socket is going to be connect as a  client side socket
io.on('connection',(socket) => {
    
    // we got this data from chat.js in the chat folder from the frontend part
    socket.on('join',({ name, room }, callback) => {
          const {error, user} = addUser({ id: socket.id, name, room});

          if(error) return callback(error);

          //Simple welcome message for any user
          socket.emit('message', {user : 'admin', text : `${user.name} , welcome to the room ${user.room}`});

          //socket.broadcast will send message to everyone beside that particular user
          socket.broadcast.to(user.name).emit('message', {user : 'admin', text: `${user.name} has joined!!`});
          
          // joins the particular user to the room
          socket.join(user.room);

          io.to(user.room).emit('roomData', {room : user.room, users: getUsersInRoom(user.room)})

          callback();
    });

    // User generated messages will be sendMessage and admin will be message, waiting for the frontend to send message
    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message',{user : user.name, text: message});
        io.to(user.room).emit('roomData',{room : user.room, users: getUsersInRoom(user.room)});

        callback();
    })

    socket.on('disconnect',() => {
        //remove the user
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.name).emit('message',{user : 'admin', text : `${user.name} has left!`})
        }
    });
});

//call the router as a middleware
app.use(router);

server.listen(PORT, ()=> console.log(`Server has started on Port ${PORT}`));