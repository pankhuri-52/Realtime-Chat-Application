import React,{useState, useEffect} from 'react';
import queryString from 'query-string'; //this will help retrieving data from the url
import io from 'socket.io-client'; 

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const ENDPOINT = 'localhost:5000';

    useEffect(() => {

        // retrieving data that user have entered while joining
        const {name, room} = queryString.parse(location.search);
        // location.search is giving us the second part of the url in which we have info about the user
        // queryString is converting that into an object

        socket = io(ENDPOINT);
        
        setName(name);
        setRoom(room);

        socket.emit('join' , {name, room}, () => {
            // this callback fn will get executed when the callback from index.js in the backend will be executed
           
        });

        //disconnect effect ( i.e. it will be executed on unmounting)
        return() => {
            socket.emit('disconnect');
            socket.off();
        }
        
    },[ENDPOINT, location.search]); // it will only be re-rendered only when these two values change

    return (
        <h1>Chat</h1>
    );
}
export default Chat;