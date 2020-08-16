const fs = require('fs')

// Función para la limpieza de parrafos vacios para un mejor uso 
function clean(oldArray) {
    var cleanArray = oldArray.filter(item => item.textContent !== "")
    return cleanArray
}



function check() {
    try {
        fs.statSync('./functionalities/db/generalinfo.json')
        const checkData = fs.readFileSync('./functionalities/db/generalinfo.json');
        var jsonData = JSON.parse(checkData);
        return jsonData.descripcion

    }
    catch (err) {
        console.log(err.code)
        return ("dont");
    }

}

module.exports = {
    clean,
    check
}