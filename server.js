require('dotenv').config()


const { saveNewsJob, saveInfoJob } = require('./jobs/scrapingJob')
const { generalInfoRoute, newsRoute } = require('./routes/index')


const schedule = require('node-schedule');
const express = require('express'),
    pug = require('pug');
const routes = require('./routes/index');
const app = express()

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => { res.render('index'), saveInfoJob() });

app.get('/general_info', generalInfoRoute);
app.get('/news', newsRoute);



app.get('/error', (req, res) => {
    res.render('error')
});


schedule.scheduleJob('32 01 * * * *', async () => {
    await saveNewsJob()

        .then(() => console.log("Database updated!"))
        .catch(console.error)
});



app.listen(process.env.PORT || 3000)



