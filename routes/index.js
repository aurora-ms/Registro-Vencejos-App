const { getGeneralInfo, getNews } = require("../dbFunctions/scrapFunctions")
const { createUser, loginUser, findUser, deleteUser, closeSesion } = require("../dbFunctions/firebaseFunctions")
const { saveInfoJob } = require('../jobs/scrapingJob')
const { checkUser } = require('../dbFunctions/firebaseFunctions')



const principalRoute = async (req, res) => {
    saveInfoJob();
    var result = await checkUser();
    if (result !== "notUser") {
        res.redirect('/user/' + result.name)
    } else {
        res.render('index', { img: null, name: null })
    }



}


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
    // setTimeout(function () { res.redirect('/user/' + result) }, 3000);
    res.redirect('/user/' + result)
}

const loginUserRoute = async (req, res) => {
    var userEmail = req.body.loginEmail;
    var userPassword = req.body.loginPassword;
    var result = await loginUser(userEmail, userPassword);
    res.redirect('/user/' + result.name)

}

const userRouter = async (req, res) => {
    const result = await findUser();
    res.render('index', { img: result.img, name: result.name })
}

const deleteUserRoute = async (req, res) => {
    var result = await deleteUser();
    if (result === 'userDelete') {
        res.render('index', { img: null, name: null });
    } else {
        res.redirect('/error')
    }
}


const closeSesionRoute = async (req, res) => {
    var result = await closeSesion();

    if (result === 'closeSesion') {
        res.redirect('/')
    } else {
        res.redirect('/error')
    }
}



module.exports = {
    principalRoute,
    generalInfoRoute,
    newsRoute,
    createUserRoute,
    loginUserRoute,
    userRouter,
    deleteUserRoute,
    closeSesionRoute
}

