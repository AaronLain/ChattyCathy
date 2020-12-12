import React, { useState } from 'react';

const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        console.log(isMessageProvided,'provided?')
        console.log(isUserProvided, 'user?')

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
            console.log(user, 'user')
            console.log(message, 'message')
        } 
        else {
            alert('Please insert an user and a message.');
        }
    }

    const onUserUpdate = (e) => {
        e.preventDefault()
        setUser(e.target.value);
        console.log(e.target.value, 'user input')
    }

    const onMessageUpdate = (e) => {
        e.preventDefault()
        setMessage(e.target.value);
        console.log(e.target.value, 'chat')
    }

    return (
        <form 
            onSubmit={onSubmit}>
            <label htmlFor="user">User:</label>
            <br />
            <input 
                id="usern" 
                name="usern" 
                value={user}
                onChange={onUserUpdate} />
            <br/>
            <label htmlFor="message">Message:</label>
            <br />
            <input 
                type="text"
                id="messagen"
                name="messagen" 
                value={message}
                onChange={onMessageUpdate} />
            <br/><br/>
            <button>Submit</button>
        </form>
    )
};

export default ChatInput;