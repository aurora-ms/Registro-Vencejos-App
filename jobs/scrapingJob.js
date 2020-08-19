const { generalInfoScrapper, newsScrapper } = require('../models/scrappers')
const { save, saveInfo } = require('../dbFunctions/scrapFunctions')

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
