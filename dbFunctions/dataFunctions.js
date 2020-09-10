const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json')
const shortid = require('shortid');


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
    var ids = "bird:" + shortid.generate()
    var docRef = db.collection('users').doc(uidIndv).collection('saved_birds').doc(ids);
    await docRef.set({
        id: ids,
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
    var allbirds = await db.collection('users').doc(uidIndv).collection('saved_birds').get()
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
    return allbirds
}

const birdWeightData = async (userId, birdid) => {
    var searchBird = await db.collection('users').doc(userId).collection('saved_birds').doc(birdid)
        .get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No matching documents.');
                return;
            } else {
                var data = doc.data();
                console.log(data)
                return data
            }

        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
    return searchBird

}

const newWeightData = async(uid, weight, date, birdId) => {
    await db.collection('users').doc(uid).collection('saved_birds').doc(birdId)
        .update({
            pesos: admin.firestore.FieldValue.arrayUnion(' Fecha:' + date + "/ " + weight + "gr."  )
        })
    return "setWeightSuccessful"
}


module.exports = {
    saveIndData,
    loginDataUser,
    deleteUserData,
    saveBirdData,
    loadBirdData,
    birdWeightData,
    newWeightData

}