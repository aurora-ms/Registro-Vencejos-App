const  {generalInfoScrapper, newsScrapper} = require('./scrappers')
const {save} = require('./functions')
const got = require('got');

const job = () => Promise.all([generalInfoScrapper(), newsScrapper()])
.then(articles => articles.flat().forEach(save))
.catch(console.error)


module.exports = {
    job
}
