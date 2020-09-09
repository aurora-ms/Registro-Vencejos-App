const firebase = require('firebase');
const { saveIndData, loginDataUser, deleteUserData, saveBirdData, loadBirdData, birdWeightData, newWeightData } = require('./dataFunctions')


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



const findUser = async () => {
    var uid = firebase.auth().currentUser.uid
    var userData = await loginDataUser(uid)
    return userData

}

const checkUser = async () => {
    var user = firebase.auth().currentUser;
    if (user) {
        var userData = await loginDataUser(user.uid)
        return userData
    } else {
        return ("notUser")
    }
}

const deleteUser = () => {
    var user = firebase.auth().currentUser;
    var result = user.delete()
        .then(async () => {
            await deleteUserData(user.uid)
            return "userDelete"
        })
        .catch((error) => {
            return error
        });
    return result

}


const closeSesion = () => {
    var result = firebase.auth().signOut()
        .then(() => {
            return "closeSesion"
        }).catch((error) => {
            return error
        });
    return result
}

const userUid = async (birdata) => {
    var uid = firebase.auth().currentUser.uid;
    var saveBird = await saveBirdData(uid, birdata);
    return saveBird

}

const selectUser =  async() => {
    var uid = firebase.auth().currentUser.uid;
     var alldata = await loadBirdData(uid);
     return alldata
}

const birdWeightCollection = async(birdid) => {
    var uid = firebase.auth().currentUser.uid;
     var alldata = await birdWeightData(uid, birdid);
     return alldata
}


const newWeightAdd = async (weight, date, birdId)=>{
    var uid = firebase.auth().currentUser.uid;
    var addData = await newWeightData(uid, weight, date, birdId )
    return addData
}


module.exports = {
    createUser, loginUser, findUser, checkUser, deleteUser, closeSesion, userUid, selectUser, birdWeightCollection, newWeightAdd
}
