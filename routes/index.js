const { getGeneralInfo, getNews } = require("../dbFunctions/scrapFunctions")
const {
    createUser,
    loginUser,
    deleteUser,
    closeSesion,
    checkUser,
    birdRegister,
    allSavedBirds,
    birdWeight,
    newWeightAdd
} = require("../dbFunctions/firebaseFunctions")
const { saveInfoJob } = require('../jobs/scrapingJob')


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
    console.log(data)

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

    if (result === userName) {
        res.redirect('/user/' + result)
    }
    else {
        res.redirect('/error')
    }
}

const loginUserRoute = async (req, res) => {
    var userEmail = req.body.loginEmail;
    var userPassword = req.body.loginPassword;
    try {
        var result = await loginUser(userEmail, userPassword);
        res.redirect('/user/' + result.name)
    } catch (error) {
        // En vez de redirigir a error tienen que saltar mensajes de que no existe ese usuario o que la ocntraseña es incorrecta
        res.redirect('/error')
    }


}

const principalRoute = async (req, res) => {
    saveInfoJob();
    try {
        var userData = await checkUser();
        if (userData) {
            res.redirect('/user/' + userData.name)
        } else {
            userData = {
                img: null,
                name: null,
            }


            var indvBirdData = {
                nombreAve: null,
                fechaentrada: null,
                pesoentrada: null,
                pesos: null
            }

            res.render('index', { userData: userData, allBirdsData: null, indvBirdData: indvBirdData })
        }
    } catch (error) {
        res.redirect('/error')
    }

}

const userRouter = async (req, res) => {
    try {
        var userData = await checkUser();



        var indvBirdData = {
            nombreAve: null,
            fechaentrada: null,
            pesoentrada: null,
            pesos: null
        }

        if (userData) {


            res.render('index', { userData: userData, allBirdsData: null, indvBirdData: indvBirdData })
        } else {
            res.redirect('/')
        }
    } catch (error) {
        res.redirect('/error')
    }
}

const deleteUserRoute = async (req, res) => {
    try {
        var deleteResult = await deleteUser();
        if (deleteResult === 'Successfully') {
            res.redirect('/');
        } else {
            res.redirect('/error')
        }
    } catch (error) {
        res.redirect('/error')
    }
}


const closeSesionRoute = async (req, res) => {
    try {
        var result = await closeSesion();
        if (result === 'closeSesion') {
            res.redirect('/')
        } else {
            res.redirect('/error')
        }
    } catch (error) {
        res.redirect('/error')
    }
}







const birdRegisterRoute = async (req, res) => {
    try {
        const birdata = {
            especie: req.body.especie,
            nombreAve: req.body.nombreAve,
            fechaentrada: req.body.fechaentrada,
            modo: req.body.modo,
            pesoentrada: req.body.pesoentrada,
            localidad: req.body.localidad
        }
        // Finalizar mostrar mensaje de que se ha guardado con  éxito
        var result = await birdRegister(birdata);
        if (result === 'savedSuccesfull') {
            res.redirect('/')
        } else {
            res.redirect('/error')
        }
    } catch (error) {
        res.redirect('/error')

    }
}


const allSavedBirdsRoute = async (req, res) => {
    try {
        const result = await allSavedBirds()
        if (result.length !== 0) {
            var allBirdsData = result;
            var indvBirdData = {
                nombreAve: null,
                fechaentrada: null,
                pesoentrada: null,
                pesos: null
            }

            var userData = {
                img: null,
                name: null,
            }

            res.render('index', { userData: userData, allBirdsData: allBirdsData, indvBirdData: indvBirdData });
        } else {
            //No nos tiene que llevar a error hay que mostrar un mensaje diciendo que no hay pajaros guardados
            res.redirect('/error')
        }
    } catch (error) {
        res.redirect('/error')
    }


}

const birdWeightRoute = async (req, res) => {
    var birdId = req.params.birdid;
    try {
        var result = await birdWeight(birdId);
        if (result.length !== 0) {

            var indvBirdData = result
            var userData = {
                img: null,
                name: null,
            }

            res.render('index', { userData: userData, allBirdsData: null, indvBirdData: indvBirdData });
        } else {
            res.redirect('/error')
        }
    } catch (error) {
        res.redirect('/error')
    }

}


const newWeightRoute = async (req, res) => {
    try {
        var newWeight = req.body.neweigth;
        var date = req.body.date;
        var birdId = req.body.birdId
        var result = await newWeightAdd(newWeight, date, birdId);
        if (result === 'setWeightSuccessful') {
            res.redirect('/allsavedbirds')
        } else {
            console.log("ERROR INDEX ELSE")
            res.redirect('/error')
        }
    } catch (error) {
        console.log("ERROR INDEX CATCH")
        return
    }

}

const birdReleaseRoute = async (req, res) => {
    var birdId = req.params.birdid;
    try {
        var result = await birdWeight(birdId);
        if (result.length !== 0) {
            var indvBirdData = result
            var userData = {
                img: null,
                name: null,
            }
            res.render('index', { userData: userData, allBirdsData: null, indvBirdData: indvBirdData });
        } else {
            res.redirect('/error')
        }
    } catch (error) {
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
    closeSesionRoute,
    birdRegisterRoute,
    allSavedBirdsRoute,
    birdWeightRoute,
    newWeightRoute,
    birdReleaseRoute
}

