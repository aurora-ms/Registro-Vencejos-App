const firebase = require('firebase');
const {saveIndData} = require('./saveDataFunctions')


const createUser = (name, email, password) => {

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            var uid = firebase.auth().currentUser.uid
            saveIndData(uid, name, email)})
        .catch(function (error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
            // ...

        })
}

const loginUser = (email, password) => {

    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function (error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
            // ...

        })
}

module.exports = {
    createUser, loginUser
}
