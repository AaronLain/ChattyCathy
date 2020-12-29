import messageData from '../Data/messageData';
import userData from '../Data/userData';
import moment from 'moment';


const responses = messageData.getResponses()

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations']

const secretFetch = () => messageData.getSecretById(2).then(result => {
    return result
})

const secretTriggers = ['tell me a secret', 'secret', 'secrets']

const getUserIdByFBuid = (fBuid) => new Promise ((resolve, reject) => {
    userData.getUsers()
        .then(response => resolve(response.filter(user => user.fBuid === fBuid)))
        .catch(err => reject(err))
})


const cathySummoner = (messageObj, parsedMessage) => {
    console.log(messageObj.userId, 'userId')
    getUserIdByFBuid(messageObj.userId)
        .then(response => {
            console.log(response[0].fBuid, 'fbuid')
            if(parsedMessage.includes('@cathy')) {
                setTimeout(() => {
                    cathyMessage(response[0].userName, parsedMessage)
                    userData.updateUserSentiment(response[0].userId, 0)
                }, 2600);
            }
        })  

}


// checks if the message includes any greeting triggers,
// if not, returns random response
const greetingCheck = async (userName, message) => {
    const rand = Math.floor(Math.random() * (responses.length));
    return secretFetch().then((secret) => {
        if (greetings.some(g => message.includes(g))) {
            return `Sup ${userName}`;
        } else if (secretTriggers.some(s => message.includes(s))) {
            return secret;
        } else {
            return `${responses[rand]}`
        }
    })
}

const sentimentAnalyzer = (message) => {
    ///TBD 
}

const cathyMessage = async (user, message) => {
    greetingCheck(user, message).then((response) => {
        const chatMessage = {
            userName: 'Cathy',
            content: response,
            userId: "1010010100",
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