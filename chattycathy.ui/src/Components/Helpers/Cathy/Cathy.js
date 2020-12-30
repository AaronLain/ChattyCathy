import messageData from '../Data/messageData';
import userData from '../Data/userData';
import moment from 'moment';


const responses = messageData.getResponses()

const greetings = messageData.getGreetings()

const secretTriggers = messageData.getSecretTriggers();

// gets the secrets from the database TODO add randomizer 
const secretFetch = () => messageData.getSecretById(2).then(result => {
    return result
})

//gets the users ID based on their Firebase UID
const getUserIdByFBuid = (fBuid) => new Promise ((resolve, reject) => {
    userData.getUsers()
        .then(response => resolve(response.filter(user => user.fBuid === fBuid)))
        .catch(err => reject(err))
})


const cathySummoner = (messageObj, parsedMessage) => {
    // looks for @cathy to create a response
    if(parsedMessage.includes('@cathy')) {
        setTimeout(() => {
            cathyMessage(messageObj.userName, parsedMessage)
        }, 2600);
    }
    //gets the userId from the fbuid if the user is logged in
    getUserIdByFBuid(messageObj.userId)
        .then(response => {
            if (response) userData.updateUserSentiment(response[0].userId, 0)
        })
        .catch(() => console.log('no userId to check'))  
    }

// randomizes Cathy's replies based on the length of whatever collection is triggered
// so we don't have to make them all the same length
const replyRandomizer = (messageArr) => {
    const rand = Math.floor(Math.random() * (messageArr.length));
    return messageArr[rand];
}

// checks if the message includes any greeting triggers or secret triggers
// if not, returns random response
const cathyTriggerFilter = async (userName, message) => {
    return secretFetch().then((secret) => {
        if (greetings.some(g => message.includes(g))) {
            return `${replyRandomizer(greetings)} ${userName}`;
        } else if (secretTriggers.some(s => message.includes(s))) {
            return secret;
        } else {
            return `${replyRandomizer(responses)}`
        }
    })
}

// after the message has been decided, it is sent to the back end here
const cathyMessage = async (user, message) => {
    cathyTriggerFilter(user, message).then((response) => {
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