import firebase from 'firebase';
import axios from 'axios';
import {baseUrl} from './constants.json';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';

// intercept request and create token
axios.interceptors.request.use(function (request) {
  const token = sessionStorage.getItem('token');

  if (token != null) {
      request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
}, function (err) {
  return Promise.reject(err);
});


const postUser = (user) => {
  getUsers().then((response) => {
    let eUser = response.filter(x => x.fBuid === user.FBuid)
    if(Object.keys(eUser).length === 0) {
       axios.post(`${baseUrl}/users`, user)
    } else {
      console.log('User exists!')
    }
  })
  .catch(err => console.log(err))
};

const registerUser = () => {

  //sub out whatever auth method firebase provides that you want to use.
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider).then(cred => {


    //get email, uid, and imageUrl from firebase
    let userInfo = {
      UserName: cred.user.displayName,
      FBuid: cred.user.uid,
      ImageUrl: cred.user.photoURL,
      Sentiment: 0.1,
    };

    //get token from firebase
    cred.user.getIdToken()
      //save the token to the session storage
      .then(token => sessionStorage.setItem('token', token))

      //save the user to the the api
      .then(() => {
         postUser(userInfo)
      })
      .catch(err => console.error('Post Customer broke', err));
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

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users`)
      .then(response => resolve(response.data))
      .catch(err => reject(err));
});

export default {
  getUid, 
  logoutUser, 
  registerUser,
  getUserInfo,
  getUsers,
};