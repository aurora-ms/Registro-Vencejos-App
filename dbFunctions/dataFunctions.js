const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json')
const { v4: uuidv4 } = require('uuid');


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

const deleteUserData = (uidIndv) => {
    db.collection('users').doc(uidIndv).delete()
        .then(function () {
            console.log("Document successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing document: ", error);
        });
    return
}

const saveBirdData = async (uidIndv, birdata) => {
    var docRef = db.collection('users').doc(uidIndv).collection('saved_birds').doc(uuidv4());
    await docRef.set({
        especie: birdata.especie,
        nombreAve: birdata.nombreAve,
        fechaentrada: birdata.fechaentrada,
        modo: birdata.modo,
        pesoentrada: birdata.pesoentrada,
        localidad: birdata.localidad
    });
    return "savedSuccesfull"

}


const loadBirdData = async (uidIndv) => {
    var data = new Array
    var prueba = await db.collection('users').doc(uidIndv).collection('saved_birds').get()
        .then(querySnapshot => {
            let docs = querySnapshot.docs;
            for (let doc of docs) {
                data.push(doc.data());
            } 
            return data
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    return prueba
}




module.exports = {
    saveIndData,
    loginDataUser,
    deleteUserData,
    saveBirdData,
    loadBirdData

}