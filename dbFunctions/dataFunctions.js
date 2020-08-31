const admin = require('firebase-admin');
var serviceAccount = require('../serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

const saveIndData = async (uid, name, email) => {
    var docRef = db.collection('users').doc(uid).collection('userData').doc('personal_data');
    var standarImg = '../images/users_icons/icon_bird1.png';
    await docRef.set({
        name: name,
        img: standarImg,
        email: email
    });
    return name
}



const loginDataUser = (uidIndv) => {
    var indvData = db.collection('users').doc(uidIndv).collection('userData').doc('personal_data').get()
        .then(async doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                var data = await doc.data()
                return data
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });

    return indvData
}




module.exports = {
    saveIndData,
    loginDataUser
}