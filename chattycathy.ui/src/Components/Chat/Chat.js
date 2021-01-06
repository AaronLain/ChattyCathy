import React, { useState, useEffect, useRef } from 'react';
import firebase from 'firebase';
import moment from 'moment';

import { HubConnectionBuilder } from '@microsoft/signalr';
import {baseUrl} from '../Helpers/Data/constants.json';
import ChatWindow from './ChatWindow/ChatWindow';
import ChatInput from './ChatInput/ChatInput';

import botData from '../Helpers/Cathy/Cathy';
import messageData from '../Helpers/Data/messageData';


const Chatty = () => {
    const [authed] = useState()
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {

        //connect with the SignalR hub
        const connection = new HubConnectionBuilder()
            .withUrl(baseUrl)
            .withAutomaticReconnect()
            .build();

            connection.start()
                .then(result => {
                    console.log('Connected');
                    // update the chat based on the recieved messages by SignalR/backend
                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    });
                })
                .catch(err => console.log('Connection failed: ', err))
        }, []);
    
    // check for Firebase UID, if logged in, if not generate a random ID
    const checkUid = () => {
        const rUser = `anon${(Math.ceil(Math.random()) * 1345436990)}`
        let userId = firebase.auth().currentUser;
        if (userId) {
            return firebase.auth().currentUser.uid
        } else {
            return rUser
        }    
    }

    //build our message object with userId, message from ChatInput. 
    //NOTE: userId in Message is actuall Firebase UID (I'll explain/fix later)
    const sendMessage = async (user, message) => {
        const chatMessage = {
            userName: user, 
            content: message,
            userId: checkUid(),
            sentiment: 0,
            date: moment(),
        }
        try {
            await messageData.postMessage(chatMessage);
        }
        catch(err) {
            console.log(err);
        }

        //parses message so stop word removal is easier on backend
        const parsedMessage = messageData.parseMessage(chatMessage.content);

        //triggers cathy logic
        botData.cathySummoner(chatMessage, parsedMessage);

}

    return (
        <div className="col w-100 mx-auto" style={{margin: '1rem'}}>
            <ChatWindow chat={chat} authed={authed}/>
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
};

export default Chatty;