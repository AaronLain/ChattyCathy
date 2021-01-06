import axios from "axios";
import {baseUrl} from "./constants.json"

const updateUserSentiment = (userId, fBuid) => axios.put(`${baseUrl}/users/user/${userId}`, fBuid);

const updateUser = (userId, updatedUser) => axios.put(`${baseUrl}/users/${userId}`, updatedUser)

const getUsers = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/users`)
        .then(response => resolve(response.data))
        .catch(err => reject(err));
  });

const getSentimentByFBuid = async (fBuid) => {
  const response = Promise.resolve(axios.get(`${baseUrl}/users/user/${fBuid}`));
  const sentiment = await response;
  console.log(sentiment.data, 'sentiment??')
  
  try {
    return sentiment.data;
  }
  catch(err) {
    console.log(err);
  } 
  
}

const getUserData = (userId) => axios.get(`${baseUrl}/users/${userId}`)


export default {  updateUserSentiment, getUsers, getSentimentByFBuid, getUserData, updateUser };
