const firebase = require('firebase');
const { firebaseConfig } = require('../middleware/firebaseConfig');
 firebase.initializeApp(firebaseConfig);

const { saveIndData, loginDataUser, deleteUserData, birdRegisterData, loadBirdData, birdWeightData, newWeightData } = require('./dataFunctions')


const selectedUser = async () => {
    var users = await firebase.auth().currentUser;
    return users
}

const createUser = (name, email, password) => {
    var createUserPromise = firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async () => {
            try {
                var user = await selectedUser()
                if (user) {
                    var newUser = await saveIndData(user.uid, name, email)
                    return newUser
                }
            } catch (error) {
                return 
            }
        })
        .catch((error) => {
            return 'error'

        })
    return createUserPromise
}

const loginUser = (email, password) => {

    var loginUserPromise = firebase.auth().signInWithEmailAndPassword(email, password)
        .then(async () => {
            try {
                var user = await selectedUser()
                if (user) {
                    var loginUser = await loginDataUser(user.uid)
                    return loginUser
                }
            } catch (error) {
                return
            }
        })
        .catch((error) => {
            return 'error'
        })

    return loginUserPromise
}


const checkUser = async () => {
    try {
        var user = await selectedUser()
        if (user) {
            var userData = await loginDataUser(user.uid)
            return userData
        } else {
            return
        }
    } catch (error) {
        return
    }

}

const deleteUser = async () => {
    try {
        var user = await selectedUser()
        var deleteUserResult = user.delete()
            .then(async () => {
                try {
                    var deleteUser = await deleteUserData(user.uid)
                    return deleteUser
                } catch (error) {
                    return 'error'
                }

            })
            .catch((error) => {
                return
            });
        return deleteUserResult
    } catch (error) {
        return 'error'
    }


}


const closeSesion = () => {
    var result = firebase.auth().signOut()
        .then(() => {
            return "closeSesion"
        }).catch((error) => {
            return
        });

    return result
}








const birdRegister = async (birdata) => {
    try {
        var user = await selectedUser()
        if (user) {
            var savedBird = await birdRegisterData(user.uid, birdata);
            return savedBird
        } else {
            return
        }
    } catch (error) {
        return
    }
}


const allSavedBirds = async () => {

    try {
        var user = await selectedUser()
        if (user) {
            var allBirdData = await loadBirdData(user.uid);
            return allBirdData
        } else {
            return
        }
    } catch (error) {
        console.log(error)
        return
    }

}

const birdWeight = async (birdid) => {
    try {
        var user = await selectedUser()
        var alldata = await birdWeightData(user.uid, birdid);
        return alldata
    } catch (error) {
        return
    }
}


const newWeightAdd = async (weight, date, birdId) => {
    try {
        var user = await selectedUser()
        var addData = await newWeightData(user.uid, weight, date, birdId)
        return addData
    } catch (error) {
        console.log("ERROR FIREBASE")
        return
    }

}


module.exports = {
    createUser,
    loginUser,
    checkUser,
    deleteUser,
    closeSesion,
    birdRegister,
    allSavedBirds,
    birdWeight,
    newWeightAdd
}
