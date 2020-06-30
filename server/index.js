const express = require('express');
const socketio = require('socket.io'); //real-time
const http = require('http'); //http is slow as compared to socket.io

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
    console.log('We have a new connection');

    socket.on('disconnect',() => {
        console.log('User had left');
    });
});

//call the router as a middleware
app.use(router);

server.listen(PORT, ()=> console.log(`Server has started on Port ${PORT}`));