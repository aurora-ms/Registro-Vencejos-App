const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./functionalities/db/db.json')
const db = low(adapter)

db.defaults({ articles: [] }).write()

const save = (data) => db.get('articles').push(data).write()
const getAll = () => db.get('articles').value()

module.exports = {
    save, getAll
}

