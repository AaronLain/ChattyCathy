import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
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
        setMessage('')
    }

    const onUserUpdate = (e) => {
        let user = firebase.auth().currentUser;
        if (user) {
            setUser(user.displayName)
        } else {
            setUser(e.target.value);
        }    
    }

    const onMessageUpdate = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div className="card text-center">
            <div className="card-body mx-auto">
            <form classnaME="form-inline"
            onSubmit={onSubmit}>
            <label style={{margin: '1rem'}} htmlFor="user">User:</label>
            <br />
            <input 
                id="user" 
                name="user" 
                value={user}
                onChange={onUserUpdate} />
            <br/>
            <div className="form-group" style={{margin: '1rem'}}>
            <label style={{margin: '1rem'}} htmlFor="message">Message:</label>
            <br />
            <input 
                
                type="text"
                id="message"
                name="message" 
                value={message}
                onChange={onMessageUpdate}
                rows="3" />
            <br/><br/>
            </div>
            <button className="btn btn-success btn-lg">Submit!</button>
            </form>

            
            </div>
            
        
        </div>
        
    )
};

export default ChatInput;