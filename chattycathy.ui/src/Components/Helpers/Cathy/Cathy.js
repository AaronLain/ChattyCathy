import messageData from '../Data/messageData';
import moment from 'moment';

const responses = messageData.getResponses()

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations']

const cathySummoner = (user, message) => {
    if(message.includes('@cathy')) {
        setTimeout(() => {
            cathyMessage(user, message)
        }, 2600);
        
    }
}

const greetingCheck = (user, message) => {
    const rand = Math.floor(Math.random() * (responses.length));
    // checks if the message includes any greeting triggers,
    // if not, returns random response
    if (greetings.some(g => message.includes(g))) {
        return `Sup ${user}`;
    } else {
        return `${responses[rand]}`
    }
}


const cathyMessage = async (user, message) => {
    const chatMessage = {
        userName: 'Cathy',
        content: greetingCheck(user, message),
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