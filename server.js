require('dotenv').config()


const { saveNewsJob } = require('./jobs/scrapingJob')
const { principalRoute, generalInfoRoute, newsRoute, createUserRoute, loginUserRoute, userRouter, deleteUserRoute, closeSesionRoute, birdRegisterRoute, allSavedBirdsRoute, birdWeightDataRoute, 
    newWeightRoute 
} = require('./routes/index');

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


app.get('/', principalRoute);
app.get('/general_info', generalInfoRoute);
app.get('/news', newsRoute);

app.get('/user/:userName', userRouter);
app.get('/birdchanges/:birdid', birdWeightDataRoute);

app.get('/allsavedbirds', allSavedBirdsRoute);



app.get('/error', (req, res) => {
    res.render('error')
});


app.post('/login', loginUserRoute);
app.post('/newregister', createUserRoute);
app.post('/deleteuser', deleteUserRoute);
app.post('/closesesion', closeSesionRoute);
app.post('/birdregister', birdRegisterRoute);
app.post('/addneweight', newWeightRoute);


schedule.scheduleJob('32 01 * * * *', async () => {
    await saveNewsJob()

        .then(() => console.log("Database updated!"))
        .catch(console.error)
});



app.listen(process.env.PORT || 3000)



