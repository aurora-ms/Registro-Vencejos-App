const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db/dbLowDb/db.json')
const db = low(adapter)

db.defaults({ generalInfo: [], articles: [] }).write()


const saveInfo = (data) => {
    if (data !== null) {
        db.get('generalInfo').push(data).write()
    }
}

const save = (data) => {
    db.get('articles').remove({ titulo: data.titulo }).write()
    db.get('articles').push(data).write()
}

const getGeneralInfo = () =>  db.get('generalInfo').value() 
const getNews = () =>  db.get('articles').value() 

module.exports = {
    save, saveInfo, getGeneralInfo, getNews
}

