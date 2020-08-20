const admin = require('firebase-admin');
var serviceAccount = require('../serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

const saveIndData = (uid, name, email)=>{
    var docRef = db.collection('users').doc(uid).collection('userData').doc('personal_data');
    var standarImg = '../public/images/users_icons/icon_bird1.png'
    docRef.set({
        name: name,
        img: standarImg,
        email: email
    });
}

module.exports ={
    saveIndData
}