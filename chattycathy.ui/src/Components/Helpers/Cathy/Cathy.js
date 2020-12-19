import messageData from '../Data/messageData';
import moment from 'moment';
import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';

const responses = messageData.getResponses()

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations']

const secretFetch = () => messageData.getSecretById(2).then(result => {
    return result
})



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
    return secretFetch().then((secret) => {
        console.log(typeof secret, 'secret')
        if (greetings.some(g => message.includes(g))) {
            return `Sup ${user}`;
        } else if (secretTriggers.some(s => message.includes(s))) {
            return secret;
        } else {
            return `${responses[rand]}`
        }
    })
}

const sentimentAnalyzer = async (message) => {
    ///TBD 
}

const cathyMessage = async (user, message) => {
    greetingCheck(user, message).then((response) => {
        const chatMessage = {
            userName: 'Cathy',
            content: response,
            userId: 666,
            sentiment: 0,
            date: moment(),
        }
        try {
            return messageData.postMessage(chatMessage);
        }
        catch(err) {
            console.log(err);
        }
    });
}

export default {cathySummoner};