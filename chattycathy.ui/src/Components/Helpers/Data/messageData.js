import axios from "axios";
import {baseUrl} from "./constants.json"

const postMessage = (chatMessage) => axios.post(`${baseUrl}/messages`, chatMessage);

const parseMessage = (message) => message.toLowerCase().split(" ")

const getSecretById = async (id) => {
    let secret = Promise.resolve(axios.get(`${baseUrl}/secrets/${id}`))
    let result = await secret;
    return result.data.secretText
}

const responses =  ['hello', "isn't that nice.", 'oh gee whiz!', 'i dunno about that!', 'aw shucks.', 'you rang?', 'what do you want?']

const greetings = ['hello', 'hi', 'hey', 'greetings', 'salutations']

const secretTriggers = ['tell me a secret', 'secret', 'secrets']

const getResponses = () => responses;

const getGreetings = () => greetings;

const getSecretTriggers = () => secretTriggers;

export default { 
    postMessage, 
    parseMessage, 
    getResponses, 
    getGreetings, 
    getSecretTriggers, 
    getSecretById 
};
