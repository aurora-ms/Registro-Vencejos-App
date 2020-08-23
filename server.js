require('dotenv').config()


const { saveNewsJob, saveInfoJob } = require('./jobs/scrapingJob')
const { generalInfoRoute, newsRoute, createUserRoute, loginUserRoute, userRouter } = require('./routes/index')

const { firebaseConfig } = require('./middleware/firebaseConfig')


const schedule = require('node-schedule');
const express = require('express');
const bodyParser = require('body-parser');
const firebase = require('firebase');
const pug = require('pug');
const app = express()


// const admin = require("firebase-admin");
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: firebaseConfig.databaseURL
// });


// var db = admin.database();

firebase.initializeApp(firebaseConfig);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))


app.set('views', './views');
app.set('view engine', 'pug');


app.get('/', (req, res) => { res.render('index', {img: null, name:null}), saveInfoJob() });
app.get('/general_info', generalInfoRoute);
app.get('/news', newsRoute);

app.get('/user/:userName', userRouter );


app.post('/login', loginUserRoute);
app.post('/newregister', createUserRoute);


app.get('/error', (req, res) => {
    res.render('error')
});


schedule.scheduleJob('32 01 * * * *', async () => {
    await saveNewsJob()

        .then(() => console.log("Database updated!"))
        .catch(console.error)
});



app.listen(process.env.PORT || 3000)



