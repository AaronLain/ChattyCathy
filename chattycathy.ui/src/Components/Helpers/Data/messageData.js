import axios from "axios";
import {baseUrl} from "./constants.json"

const postMessage = (chatMessage) => axios.post(`${baseUrl}/messages`, chatMessage);

const parseMessage = (message) => message.toLowerCase().split(" ");

const getMessagesByFBuid = (fBuid) => axios.get(`${baseUrl}/messages/${fBuid}`)

const getSecretById = async (id) => {
    let secret = Promise.resolve(axios.get(`${baseUrl}/secrets/${id}`))
    let result = await secret;
    return result.data.secretText
}

const getSickBurnById = async (id) => {
    let burn = Promise.resolve(axios.get(`${baseUrl}/burns/${id}`))
    let result = await burn;
    return result.data.sickBurnContent
}

const responses =  ['hello', "isn't that nice.", 'oh gee whiz!', 'i dunno about that!', 'aw shucks.', 'you rang?', 'what do you want?', 'i was not aware of that', 'huh', 'well there you go', 'thats what i was thinkin']

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations', 'sup', 'wassaaaaap', 'whats up']

const secretTriggers = ['tell me a secret', 'secret', 'secrets', 'tell a secret']

const getResponses = () => responses;

const getGreetings = () => greetings;

const getSecretTriggers = () => secretTriggers;

export default { 
    postMessage, 
    parseMessage, 
    getResponses, 
    getGreetings, 
    getSecretTriggers, 
    getSecretById,
    getSickBurnById,
    getMessagesByFBuid
};
