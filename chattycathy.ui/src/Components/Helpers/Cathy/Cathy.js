import messageData from '../Data/messageData';
import moment from 'moment';

const responses = messageData.getResponses()

const secrets = messageData.getSecrets()

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations']

const secretTriggers = ['secret', 'tell me a secret', 'tell secret', 'secrets']

const cathySummoner = (user, message) => {
    if(message.includes('@cathy')) {
        setTimeout(() => {
            cathyMessage(user, message)
            console.log(secrets)
        }, 2600);
        
    }
}

// checks if the message includes any greeting triggers,
// if not, returns random response
const greetingCheck = async (user, message) => {
    const rand = Math.floor(Math.random() * (responses.length));
    if (greetings.some(g => message.includes(g))) {
        return `Sup ${user}`;
    } else if (secretTriggers.some(s => message.includes(s))) {
        return 'please stand by'
    } else {
        return `${responses[rand]}`
    }
}

const sentimentAnalyzer = async (message) => {
    ///TBD 
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