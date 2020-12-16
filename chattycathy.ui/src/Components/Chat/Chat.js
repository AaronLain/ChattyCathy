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
        const rUser = `anon${+ (Math.ceil(Math.random()) * Date.now())}`

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              return firebase.auth().currentUser.uid
            } else if (!user){
              user = rUser
              return user
            }
          });
    }

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

        const parsedMessage = messageData.parseMessage(chatMessage.content);
        botData.cathySummoner(parsedMessage);

}

    return (
        <div>
            <ChatWindow chat={chat}/>
            <ChatInput sendMessage={sendMessage} />
        </div>
    );
};

export default Chatty;