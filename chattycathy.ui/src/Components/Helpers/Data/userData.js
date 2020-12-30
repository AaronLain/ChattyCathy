import axios from "axios";
import {baseUrl} from "./constants.json"

const updateUserSentiment = (userId, sentiment) => axios.put(`${baseUrl}/users/${userId}`, sentiment);

const getUsers = () => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/users`)
        .then(response => resolve(response.data))
        .catch(err => reject(err));
  });
  

export default {  updateUserSentiment, getUsers };
