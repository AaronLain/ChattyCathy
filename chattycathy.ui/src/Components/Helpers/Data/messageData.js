import axios from "axios";
import {baseUrl} from "./constants.json"

const checkMessageId = (messageId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/messages/${messageId}`)
        .then(response => resolve(response.data))
        .catch(error => console.error('No customer exists with this login', error));
});

    const postMessage = (chatMessage) => axios.post(`${baseUrl}/messages`, chatMessage);

    const parseMessage = (message) => message.split(" ")

export default { checkMessageId, postMessage, parseMessage };
