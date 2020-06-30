const express = require('express');
const socketio = require('socket.io'); //real-time
const http = require('http'); //http is slow as compared to socket.io

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
//instance of socketio
//to make socket.io working
const io = socketio(server);

server.listen(PORT, ()=> console.log(`Server has started on Port ${PORT}`));