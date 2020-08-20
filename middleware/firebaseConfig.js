var firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROYECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MSENDERID,
  appId: process.env.APPID
};



module.exports = {
  firebaseConfig
}
