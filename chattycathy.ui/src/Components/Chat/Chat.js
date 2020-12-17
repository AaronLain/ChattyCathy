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
        const connection = new HubConnectionBuilder()
            .withUrl(baseUrl)
            .withAutomaticReconnect()
            .build();

            connection.start()
                .then(result => {
                    console.log('Connected');

                    connection.on('ReceiveMessage', message => {
                        const updatedChat = [...latestChat.current];
                        updatedChat.push(message);

                        setChat(updatedChat);
                    });
                })
                .catch(err => console.log('Connection failed: ', err))
        }, []);
    

    const checkUid = () => {
        const rUser = `anon${(Math.ceil(Math.random()) * 1345436990)}`
        let userId = firebase.auth().currentUser;
        if (userId) {
            return firebase.auth().currentUser.uid
        } else {
            return rUser
        }    
    }

    const sendMessage = async (user, message) => {
        const chatMessage = {
            userName: user,
            content: message,
            fBuid: checkUid(),
            sentiment: 0,
            date: moment(),
        }
        console.log(chatMessage, 'chatMessage')
        try {
            await messageData.postMessage(chatMessage);
        }
        catch(err) {
            console.log(err);
        }

        const parsedMessage = messageData.parseMessage(chatMessage.content);

        botData.cathySummoner(chatMessage.userName, parsedMessage);

}

    return (
        <div className="col w-100 mx-auto" style={{margin: '1rem'}}>

                <ChatWindow chat={chat} authed={authed}/>
                <ChatInput sendMessage={sendMessage} />
          
            
        </div>
    );
};

export default Chatty;