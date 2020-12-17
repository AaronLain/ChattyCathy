import React, { useState } from 'react';
import authedData from '../../Helpers/Data/authedData'

const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    
    const onSubmit = (e) => {
        e.preventDefault();

        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
        } 
        else {
            alert('Please type a username and message!');
        }
    }

    const onUserUpdate = (e) => {
        setUser(e.target.value);
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <form class="form-inline"
            onSubmit={onSubmit}>
            <label htmlFor="user">User:</label>
            <br />
            <input 
                id="user" 
                name="user" 
                value={user}
                onChange={onUserUpdate} />
            <br/>
            <div className="form-group">
            <label htmlFor="message">Message:</label>
            <br />
            <input 
                
                type="text"
                id="message"
                name="message" 
                value={message}
                onChange={onMessageUpdate}
                rows="3" />
            <br/><br/>
            <button>Submit</button>
            </div>
            
        </form>
    )
};

export default ChatInput;