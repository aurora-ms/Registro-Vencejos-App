const { getGeneralInfo, getNews } = require("../dbFunctions/scrapFunctions")
const { createUser, loginUser, findUser } = require("../dbFunctions/firebaseFunctions")



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


const createUserRoute = async (req, res) => {
    var userName = req.body.registerName;
    var userEmail = req.body.registerEmail;
    var userPassword = req.body.registerPassword;
    var result = await createUser(userName, userEmail, userPassword)
    setTimeout(function () { res.redirect('/user/' + result) }, 3000);
    // res.redirect('/user/' + result)
}

const loginUserRoute = (req, res) => {
    var userEmail = req.body.loginEmail;
    var userPassword = req.body.loginPassword;
    loginUser(userEmail, userPassword)

}


const userRouter = async (req, res) => {
    const result = await findUser();
    console.log(result)
    res.render('index', {img: result.img, name:result.name})
}


module.exports = {
    generalInfoRoute,
    newsRoute,
    createUserRoute,
    loginUserRoute,
    userRouter
}

