import axios from "axios";
import {baseUrl} from "./constants.json"

const checkMessageId = (messageId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/messages/${messageId}`)
        .then(response => resolve(response.data))
        .catch(error => console.error('No customer exists with this login', error));
});

const postMessage = (chatMessage) => axios.post(`${baseUrl}/messages`, chatMessage);

const parseMessage = (message) => message.toLowerCase().split(" ")

const responses =  ['Hello', "Isn't that nice.", 'Oh gee whiz!', 'I dunno about that!', 'Aw shucks.', 'You rang?', 'What do you want?']

const getResponses = () => responses;

export default { checkMessageId, postMessage, parseMessage, getResponses };
