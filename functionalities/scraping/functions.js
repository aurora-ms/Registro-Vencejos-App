const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./functionalities/db/db.json')
const db = low(adapter)

db.defaults({ generalInfo: [], articles: [] }).write()


const saveInfo = (data) => {
    if (data !== null) {
        db.get('generalInfo').push(data).write()
    }
}

const save = (data) => {
    db.get('articles').remove({ img: data.img }).write()
    db.get('articles').push(data).write()
}

const getAll = () => db.get('articles').value()

module.exports = {
    save, getAll, saveInfo
}

