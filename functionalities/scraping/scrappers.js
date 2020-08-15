// https://www.seo.org/ave/vencejo-comun/

const fs = require('fs')
const { writeFileSync } = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const got = require('got');


const generalInfoScrapper = async () => {

    const { body } = await got('https://www.seo.org/ave/vencejo-comun/');
    const dom = new JSDOM(body);
    const document = dom.window.document;

    const checkInfo = await check();

    //Comprueba que la información ya esta guardada y que no a cambiado su contenido de esta manera no necesita realizarla multiples veces
    if (checkInfo === false || checkInfo !== document.querySelector('.description-bird > p').textContent) {
        const generalData = document.getElementById('1485875463-2-67');
        const selectedData = Array.from(generalData.querySelectorAll('.inner-box > .mk-text-block > p'));

        const finalArray = await clean(selectedData)


        const data = {
            descripcion: document.querySelector('.description-bird > p').textContent,
            clasificacion: finalArray[0].textContent,
            longitud: finalArray[1].textContent,
            envergadura: finalArray[2].textContent,
            identificacion: finalArray[3].textContent,
            canto: finalArray[4].textContent
        };

        writeFileSync("./functionalities/db/generalinfo.json", JSON.stringify(data, null, 2))
        return data
    }


}


// Función para la limpieza de parrafos vacios para un mejor uso 
function clean(oldArray) {
    var cleanArray = oldArray.filter(item => item.textContent !== "")
    return cleanArray
}



function check() {
    try {
        fs.statSync('./functionalities/db/generalinfo.json');
        const checkData = fs.readFileSync('./functionalities/db/generalinfo.json');
        var jsonData = JSON.parse(checkData);
        return jsonData.descripcion
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            console.log("no existe")
            return (false);
        }
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

    writeFileSync("./functionalities/db/news.json", JSON.stringify(data, null, 2))
    return data
};


module.exports = {
    generalInfoScrapper,
    newsScrapper
}


//--------------------------------------

// const {writeFileSync} = require('fs');
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// const got = require('got');


// const genbetaScrapper = async () => {
//     const {body} = await got('https://www.genbeta.com/categoria/desarrollo');
//     //writeFileSync("./genbeta.html", body)
//     const dom = new JSDOM(body);
//     const document = dom.window.document;
//     const data = Array.from(document.querySelectorAll(".abstract-article")).map(item => {
//         return {
//             title: item.querySelector('.abstract-title > a').textContent,
//             url: item.querySelector('.abstract-title > a').href,
//             thumb: item.querySelector("picture > img").src,
//             source: "Genbeta Dev",
//             category: "Coding"
//         }});
//     writeFileSync("./genebeta.json", JSON.stringify(data, null, 2))
//     return data
//     //console.log(titles)
// };


// const elmundotodayScrapper = async () => {
//     const {body} = await got('https://www.elmundotoday.com/noticias/tecnologia/');
//     writeFileSync("./web.html", body)
//     const dom = new JSDOM(body);
//     const document = dom.window.document;
//     const data = Array.from(document.querySelectorAll(".td-module-thumb > a")).map(item => {
//         return {
//             title: item.title,
//             url: item.href,
//             thumb: item.querySelector("img").src,
//             source: "El mundo today",
//             category: "Humor"
//         }});
//     writeFileSync("./elmundotoday.json", JSON.stringify(data, null, 2))
//     return data
//     //console.log(titles)
// };


// module.exports = {
//     genbetaScrapper,
//     elmundotodayScrapper
// }