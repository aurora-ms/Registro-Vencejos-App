require('dotenv').config()

const { getAll } = require('./functionalities/scraping/functions')
const { saveNewsJob, saveInfoJob } = require('./functionalities/scraping/scrapingJob')

const schedule = require('node-schedule');
const express = require('express'),
    pug = require('pug');
const app = express()

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index.pug');

});

app.get('/general_info', (req, res) => {
    res.render('index.pug');
   
    // const data = getAll()
    // if (!data.length) {
    //     return res.status(500).json({ msg: `Database is empty.` })
    // }
    // res.json(getAll())
});


schedule.scheduleJob('* * * * * *', async () => {
    await saveInfoJob()
    await saveNewsJob()

        .then(() => console.log("Database updated!"))
        .catch(console.error)
});



app.listen(process.env.PORT || 3000)



