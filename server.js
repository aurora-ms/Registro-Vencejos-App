require('dotenv').config()

const express = require('express')
pug = require('pug');
const app = express()

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index.pug'); 
  });

app.listen(process.env.PORT || 3000)