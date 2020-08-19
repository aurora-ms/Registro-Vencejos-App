const { getGeneralInfo, getNews } = require("../dbFunctions/scrapFunctions")

const generalInfoRoute = (req, res) => {
    const data = getGeneralInfo()

    if (!data.length) {
        res.redirect('/error');
    } else {
        const indvData = {
            descripcion: data[0].descripcion,
            clasificacion: data[0].clasificacion,
            longitud: data[0].longitud,
            envergadura: data[0].envergadura,
            identificacion: data[0].identificacion,
        }
        res.render('generalInfo', { indvData: indvData });
    }

}

const newsRoute = (req, res) => {
    const data = getNews()
    
    if (!data.length) {
        res.redirect('/error');
    } else {
        res.render('news', { data: data });
    }

}


module.exports = {
    generalInfoRoute, newsRoute
}

