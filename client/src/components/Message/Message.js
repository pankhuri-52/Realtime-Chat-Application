import React from 'react';
import ReactEmoji from 'react-emoji';
import './Message.css';

const Message = ({message : {user,text}, name}) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    // message should appear on the right in blue
    if(user === trimmedName){
        isSentByCurrentUser = true;
    }

    return (
        isSentByCurrentUser ? 
        (
            // if send by current user
            <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{trimmedName}</p>
                <div className="messageBox backgroundBlue">
                    <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        )
        : (
            // not send by current user
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    )
}
export default Message;