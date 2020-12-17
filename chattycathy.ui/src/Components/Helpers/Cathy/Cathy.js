import messageData from '../Data/messageData';
import moment from 'moment';

const responses = messageData.getResponses()

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations']

const cathySummoner = (user, message) => {
    console.log(message, 'message')
    if(message.includes('@cathy')) {
        setTimeout(() => {
            cathyMessage(user, message)
        }, 2600);
        
    }
}

const responseSelector = () => {
    const rand = Math.ceil(Math.random() * 6);
    return `${responses[rand]}`
}

const greetingCheck = (user, message) => {
    if (greetings.some(g => message.includes(g))) {
        return `${responses[0]} ${user}`;
    } else {
        responseSelector()
    }
}


const cathyMessage = async (user, message) => {
    // wait for greeting check before posting to server to avoid 500 error
    const content = await greetingCheck(user, message)
    const chatMessage = {
        userName: 'Cathy',
        content: content,
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