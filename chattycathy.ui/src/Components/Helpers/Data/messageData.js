import axios from "axios";
import {baseUrl} from "./constants.json"

const postMessage = (chatMessage) => axios.post(`${baseUrl}/messages`, chatMessage);

const parseMessage = (message) => message.toLowerCase().split(" ")

const getSecretById = async (id) => {
    let secret = Promise.resolve(axios.get(`${baseUrl}/secrets/${id}`))
    let result = await secret;
    return result.data.secretText
}

const responses =  ['Hello', "Isn't that nice.", 'Oh gee whiz!', 'I dunno about that!', 'Aw shucks.', 'You rang?', 'What do you want?']

const getResponses = () => responses;

export default { postMessage, parseMessage, getResponses, getSecretById };
