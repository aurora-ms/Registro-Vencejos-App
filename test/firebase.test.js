const {
    createUser,
    loginUser,
    deleteUser,
    checkUser,
} = require("../dbFunctions/firebaseFunctions")


// const firebaseApp = require('../server');

test('crear usuario en firebase auth y en cloud firestore', async () => {
    var promise = await createUser('example', "example@domain.com", "123456")

    if (promise !== 'error') {
         expect(promise).toBe('example');
    } else {
         expect(promise).toBe('error');
    }
}
) 

test('inicio de sesion de usuario y busqueda de datos en la BD', async () => {
    var data =     {
        name: 'example',
        email: 'example@domain.com',
        img: '../images/users_icons/icon_bird1.png'
      }

      var promise = await loginUser("example@domain.com", "123456")

    if (promise !== 'error') {
         expect(promise).toEqual( data);
    } else {
         expect(promise).toBe('error');
    }
}
) 


test('chekear usuario con sesion iniciada', async () => {
    var data =     {
        name: 'example',
        email: 'example@domain.com',
        img: '../images/users_icons/icon_bird1.png'
      }

      var promise = await checkUser()

    if (promise !== 'error') {
         expect(promise).toEqual( data);
    } else {
         expect(promise).toBe('error');
    }
}
) 


test('borrar usuario ', async () => {
    var promise = await deleteUser()

    if (promise !== 'error') {
         expect(promise).toBe('Successfully');
    } else {
         expect(promise).toBe('error');
    }
}
) 
