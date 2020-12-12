import React, { useState, useEffect, useRef } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import {baseUrl} from '../Helpers/Data/constants.json'
import ChatWindow from './ChatWindow/ChatWindow';
import ChatInput from './ChatInput/ChatInput';

const Chatty = () => {
    const [ connection, setConnection ] = useState(null);
    const [ chat, setChat ] = useState([]);
    const latestChat = useRef(null);

    latestChat.current = chat;

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(baseUrl)
            .withAutomaticReconnect()
            .build();

            setConnection(newConnection)
        }, []);
    
    useEffect(() => {
        if (connection) {
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
        }
    }, [connection]);

    const sendMessage = async (user, message) => {
        const chatMessage = {
            user: user,
            message: message
        };
        console.log(latestChat.current, 'chat')
    if (connection.connectionStarted) {
        try {
            await connection.send('SendMessage', chatMessage);
        }
        catch(err) {
            console.log(err);
        }
    }
    else {
        alert('No connection to server.');
    }
}

    return (
        <div>
            <ChatInput sendMessage={sendMessage} />
            <hr />
            <ChatWindow chat={chat}/>
        </div>
    );
};

export default Chatty;