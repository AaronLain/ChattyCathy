import messageData from '../Data/messageData';
import moment from 'moment';

const responses = ['Hello?', "Isn't that nice.", 'Oh gee whiz!', 'I dunno about that!', 'Aw shucks.']

const cathySummoner = (message) => {
    if(message.includes('@cathy')) {
        setTimeout(() => {
            cathyMessage()
        }, 3000);
        
    }
}

const responseSelector = () => {
    const rand = Math.ceil(Math.random() * 4);
    return `${responses[rand]}`
}


const cathyMessage = async () => {
    const chatMessage = {
        userName: 'Cathy',
        content: responseSelector(),
        userId: 666,
        sentiment: 0,
        date: moment(),
    }
    try {
        await messageData.postMessage(chatMessage);
    }
    catch(err) {
        console.log(err);
    }
}

export default {cathySummoner};