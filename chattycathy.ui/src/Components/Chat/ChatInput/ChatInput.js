import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import authedData from '../../Helpers/Data/authedData'

const ChatInput = (props) => {
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');

    
    const onSubmit = (e) => {
        e.preventDefault();

        // checks if user or message fields are blank
        const isUserProvided = user && user !== '';
        const isMessageProvided = message && message !== '';

        if (isUserProvided && isMessageProvided) {
            props.sendMessage(user, message);
        } 
        else {
            alert('Please type a username and message!');
        }
        // resets message field after it's sent
        setMessage('')
    }

    //automatically sets display name if logged in
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
        <div className="card text-center text-white bg-dark">
            <div className="card-body mx-auto w-75">
            <form onSubmit={onSubmit}>
                <div className="row">
                    <div className="col">
                    <input style={{margin: '1rem'}}
                        className="form-control"
                        placeholder="User Name" 
                        id="user" 
                        name="user" 
                        value={user}
                        onChange={onUserUpdate} 
                    />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                    <input style={{margin: '1rem'}}
                       className="form-control"
                       placeholder="Message"
                       type="text"
                       id="message"
                       name="message" 
                       value={message}
                       onChange={onMessageUpdate}
                       rows="3" />
                    </div>
                </div>
            <button className="btn btn-success btn-lg">Submit!</button>
            </form>
            </div>
        </div>
        
    )
};

export default ChatInput;