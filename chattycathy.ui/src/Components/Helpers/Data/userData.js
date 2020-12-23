import axios from "axios";
import {baseUrl} from "./constants.json"

const checkCustomerUid = (uid) => new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/customers/${uid}`)
        .then(response => resolve(response.data))
        .catch(error => console.error('No customer exists with this login', error));
});

const createNewCustomer = (uid, userInput) => new Promise((resolve, reject) => {
    const newUser = {
       CustomerID: uid,
       FirstName: userInput.firstName,
       LastName: userInput.lastName,
       EmailAddress: userInput.emailAddress,
       MailingAddress: userInput.mailingAddress,
       AccountCreated: Date.now().toJSON(),
    }

    const postNewCustomer = (newUser) => axios.post(`${baseUrl}/customers`, newUser);

});

const updateUserSentiment = (userId, sentiment) => axios.put(`${baseUrl}/users/${userId}`, sentiment);

export default { checkCustomerUid, createNewCustomer, updateUserSentiment };
