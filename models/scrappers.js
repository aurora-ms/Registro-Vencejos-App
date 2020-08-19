// https://www.seo.org/ave/vencejo-comun/

const { writeFileSync } = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const got = require('got');

const {clean, check} = require('../middleware/scrapHelpers')


const generalInfoScrapper = async () => {

    const { body } = await got('https://www.seo.org/ave/vencejo-comun/');
    const dom = new JSDOM(body);
    const document = dom.window.document;

    const checkInfo = await check();

    //Comprueba que la información ya esta guardada y que no a cambiado su contenido de esta manera no necesita realizarla multiples veces
    if (checkInfo === 'dont' || checkInfo !== document.querySelector('.description-bird > p').textContent) {
        const generalData = document.getElementById('1485875463-2-67');
        const selectedData = Array.from(generalData.querySelectorAll('.inner-box > .mk-text-block > p'));

        const finalArray = await clean(selectedData)


        const data = {
            descripcion: document.querySelector('.description-bird > p').textContent,
            clasificacion: finalArray[0].textContent,
            longitud: finalArray[1].textContent,
            envergadura: finalArray[2].textContent,
            identificacion: finalArray[3].textContent,
        };

        writeFileSync("./db/dbLowDb/generalinfo.json", JSON.stringify(data, null, 2))
        return data
    } else {
        return null
    }


}

const newsScrapper = async () => {
    const { body } = await got('https://www.seo.org/category/aves/');
    const dom = new JSDOM(body);
    const document = dom.window.document;


    const data = Array.from(document.querySelectorAll('.blog-classic-entry')).map(item => {
        return {
            img: item.querySelector('.featured-image > img').src,
            alt: item.querySelector('.featured-image > img').alt,
            titulo: item.querySelector('.blog-entry-heading > h3 > a').textContent,
            link: item.querySelector('.blog-entry-heading > h3 > a').href,
            fecha: item.querySelector('.blog-meta > time > a').textContent,
            except: item.querySelector('.blog-excerpt').textContent
        };
    })

    writeFileSync("./db/dbLowDb/news.json", JSON.stringify(data, null, 2))
    return data
};


module.exports = {
    generalInfoScrapper,
    newsScrapper
}
