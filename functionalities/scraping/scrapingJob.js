const { generalInfoScrapper, newsScrapper } = require('./scrappers')
const { save, saveInfo } = require('./functions')
const got = require('got');

const saveInfoJob = () => generalInfoScrapper()
    .then((data) => {
            saveInfo(data)
    })

const saveNewsJob = () => newsScrapper()
    .then(articles => {
        articles.flat().forEach(save)
    })
    .catch(error => console.log(error))


module.exports = {
    saveNewsJob, saveInfoJob
}
