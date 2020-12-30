import axios from "axios";
import {baseUrl} from "./constants.json"

const updateUserSentiment = (userId, fBuid) => axios.put(`${baseUrl}/users/${userId}`, fBuid);

const getUsers = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/users`)
        .then(response => resolve(response.data))
        .catch(err => reject(err));
  });

  const getSentimentByFBuid = async (fBuid) => {
    const response = Promise.resolve(axios.get(`${baseUrl}/users/user/${fBuid}`));
    const sentiment = await response;
    return sentiment.data
  }

  

export default {  updateUserSentiment, getUsers, getSentimentByFBuid };
