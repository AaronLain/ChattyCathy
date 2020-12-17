import messageData from '../Data/messageData';
import moment from 'moment';

const responses = ['Hello', "Isn't that nice.", 'Oh gee whiz!', 'I dunno about that!', 'Aw shucks.']

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations']

const cathySummoner = (user, message) => {
    if(message.includes('@cathy')) {
        setTimeout(() => {
            cathyMessage(user, message)
        }, 2600);
        
    }
}

const responseSelector = () => {
    const rand = Math.ceil(Math.random() * 4);
    return `${responses[rand]}`
}

const greetingCheck = (user, message) => {
    if (greetings.some(g => message.includes(g))) {
        return `${responses[0]} ${user}`
    } else {
        responseSelector()
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