import messageData from '../Data/messageData';
import moment from 'moment';

const responses = messageData.getResponses()

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations']

const secretTriggers = ['tell me a secret', 'secret', 'secrets']

const cathySummoner = (user, message) => {
    if(message.includes('@cathy')) {
        setTimeout(() => {
            cathyMessage(user, message)
        }, 2600);
        
    }
}

// checks if the message includes any greeting triggers,
// if not, returns random response
const greetingCheck = (user, message) => {
    const rand = Math.floor(Math.random() * (responses.length));
    if (greetings.some(g => message.includes(g))) {
        return `Sup ${user}`;
    } else if (secretTriggers.some(s => message.includes(s))) {
        return 'Secrets secrets are no fun'
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