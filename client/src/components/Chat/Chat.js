import React,{useState, useEffect} from 'react';
import queryString from 'query-string'; //this will help retrieving data from the url
import io from 'socket.io-client'; 
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';

import './Chat.css';

let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    // array of messages
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
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


    // UseEffect for handling messages
    useEffect(() => {
        socket.on('message',(message) => {
            // push the message to the messages array
            setMessages([...messages, message])
        })
    },[messages]); // when messages array changes

    // function for sending messages
    const sendMessage = (event) => {
        // we do not want page refresh wen a user clicks a button
        event.preventDefault();

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    );
}
export default Chat;