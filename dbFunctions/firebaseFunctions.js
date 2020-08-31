const firebase = require('firebase');
const { saveIndData, loginDataUser } = require('./dataFunctions')


const createUser = (name, email, password) => {
    var createUserPromise = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async () => {
            var uid = firebase.auth().currentUser.uid
            var finalUser = await saveIndData(uid, name, email)
            return finalUser

        })
        .catch(function (error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
            // ...
            return "error"
        })
    return createUserPromise
}

const loginUser = (email, password) => {

    var loginUserPromise = firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async () => {
            var uid = firebase.auth().currentUser.uid;
            var finalUser = await loginDataUser(uid)
            return finalUser
        })
        .catch(function (error) {
            // Handle Errors here.
            console.log(error.code);
            console.log(error.message);
            // ...
            return "error"
        })
    return loginUserPromise
}


//Controlar asincronia para que espere a crear el usuario antes de poder buscarlo

const findUser = async () => {
    var uid = firebase.auth().currentUser.uid
    const userData = await loginDataUser(uid)
    return userData

}

module.exports = {
    createUser, loginUser, findUser
}
