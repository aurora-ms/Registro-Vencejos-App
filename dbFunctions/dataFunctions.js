const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json')
const shortid = require('shortid');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}


var db = admin.firestore();

const docRef = (userUid) => {
    return db.collection('users').doc(userUid).collection('userData').doc('personal_data')
}

const saveIndData = async (userUid, name, email) => {
    try {
        var standarImg = '../images/users_icons/icon_bird1.png';
        await docRef(userUid)
            .set({
                name: name,
                img: standarImg,
                email: email
            });
        return name
    } catch (error) {
        return 'error'
    }
}

const loginDataUser = async (userUid) => {
    try {
        var indvData = await docRef(userUid).get()
        if (!indvData.exists) {
            console.log('No such document!');
            return
        } else {
            var data = indvData.data()
            return data
        }
    } catch (error) {
        console.log(error)
        return
    }

}


const deleteUserData = async (uidIndv) => {
    try {
        await db.collection('users').doc(uidIndv).delete()
        return "Successfully";
    } catch (error) {
        return "error";
    }

}


const birdRegisterData = async (uidIndv, birdata) => {
    var ids = "bird:" + shortid.generate()
    try {
        await db.collection('users').doc(uidIndv).collection('saved_birds').doc(ids)
            .set({
                id: ids,
                especie: birdata.especie,
                nombreAve: birdata.nombreAve,
                fechaentrada: birdata.fechaentrada,
                modo: birdata.modo,
                pesoentrada: birdata.pesoentrada,
                localidad: birdata.localidad
            });
        return "savedSuccesfull"
    } catch (error) {
        return 'error'
    }
}


const loadBirdData = async (uidIndv) => {
    try {
        var data = new Array
        var allbirds = await db.collection('users').doc(uidIndv).collection('saved_birds').get()

        let docs = allbirds.docs;
        for (let doc of docs) {
            data.push(doc.data());
        }
        return data

    } catch (error) {
        return 'error'
    }

}

const birdWeightData = async (userId, birdid) => {
    try {
        var searchBird = await db.collection('users').doc(userId).collection('saved_birds').doc(birdid).get()
        if (!searchBird.exists) {
            console.log('No matching documents.');
            return 'error';
        } else {
            var data = searchBird.data();
            return data
        }
    } catch (error) {
        return 'error'
    }


}

const newWeightData = async (uid, weight, date, birdId) => {
    try {
        await db.collection('users').doc(uid).collection('saved_birds').doc(birdId)
            .update({
                pesos: admin.firestore.FieldValue.arrayUnion(' Fecha:' + date + "/ " + weight + "gr.")

            })
        return "setWeightSuccessful"
    } catch (error) {
        return 'error'
    }
}

module.exports = {
    saveIndData,
    loginDataUser,
    deleteUserData,
    birdRegisterData,
    loadBirdData,
    birdWeightData,
    newWeightData

}