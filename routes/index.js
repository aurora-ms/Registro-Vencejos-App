const { getGeneralInfo, getNews } = require("../dbFunctions/scrapFunctions")
const { createUser, loginUser } = require("../dbFunctions/firebaseFunctions")

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
        //OPTIMIZAR NO HACE FALTA DATA:DATA
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


const createUserRoute = (req, res) => {
    var userName = req.body.registerName;
    var userEmail = req.body.registerEmail;
    var userPassword = req.body.registerPassword;
    createUser(userName, userEmail, userPassword)
    res.redirect('/user/'+ userName)
    



}

const loginUserRoute = (req, res) => {
    var userEmail = req.body.loginEmail;
    var userPassword = req.body.loginPassword;
    loginUser(userEmail, userPassword)

}



module.exports = {
    generalInfoRoute,
    newsRoute,
    createUserRoute,
    loginUserRoute
}

