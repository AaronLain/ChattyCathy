import firebase from 'firebase';
import axios from 'axios';
import {baseUrl} from '../constants.json';
import { Redirect } from 'react-router-dom';

// interceptors work by changing the outbound request before the xhr is sent 
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use(function (request) {
  const token = sessionStorage.getItem('token');

  if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, function (err) {
  return Promise.reject(err);
});

const registerUser = (user) => {

  //sub out whatever auth method firebase provides that you want to use.
  return firebase.auth().createUserWithEmailAndPassword(user.email.trim(), user.password).then(cred => {

    //get email from firebase
    let userInfo = {
      EmailAddress: cred.user.email,
      UserName: cred.user.displayName,
      Password: user.password,
      FBuid: cred.user.uid,
      ImageUrl: cred.user.photoURL,
      Sentiment: user.sentiment,
    };

    //get token from firebase
    cred.user.getIdToken()
      //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token))
      
      //save the user to the the api
      .then(() => axios.post(`${baseUrl}/users`, userInfo))
      .catch(err => console.error('Post Customer broke', err));
  });
};

const loginUser = (user) => {
  //sub out whatever auth method firebase provides that you want to use.
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
    //get token from firebase
    cred.user.getIdToken()
        //save the token to the session storage
      .then(token => sessionStorage.setItem('token',token))
      .catch(err => console.error('Log in Broke', err));
  });
};

const getUserInfo = (userId) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/users/${userId}`)
        .then(response => resolve(response.data))
        .catch(err => reject(err));
});

const logoutUser = () => {
  sessionStorage.removeItem('token');
  return firebase.auth().signOut();
};

const getUid = () => {
  return firebase.auth().currentUser.uid;
};

const getCustomers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users`)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
});

export default {
  getUid, 
  loginUser, 
  logoutUser, 
  registerUser,
  getUserInfo,
  getCustomers
};