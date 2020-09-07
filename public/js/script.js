// Creación funciones pg. inicial de la app.

// Animacion banda del menu principal

var animatedLink = document.querySelectorAll('#principal_menu > a');

animatedLink[1].addEventListener('mouseover', () => {
    interpolate(-100)
})

animatedLink[1].addEventListener('mouseout', () => {
    interpolate(1)
})

animatedLink[2].addEventListener('mouseover', () => {
    interpolate(100)
})

animatedLink[2].addEventListener('mouseout', () => {
    interpolate(1)
})


function interpolate(x) {
    document.getElementById('decoration').setAttribute('style', `transform:scaleX(${x})`)
}



//Cambio de inicio de sesión a login


var buttons = document.querySelectorAll('#principal_section > div > div> button')

buttons[0].addEventListener('click', () => {
    document.getElementById('loginsection').classList.add('invisible');
    document.getElementById('initsection').classList.remove('invisible');
    buttons[0].setAttribute('class', 'active')
    buttons[1].removeAttribute('class', 'active')
})

buttons[1].addEventListener('click', () => {
    document.getElementById('loginsection').classList.remove('invisible');
    document.getElementById('initsection').classList.add('invisible');
    buttons[1].setAttribute('class', 'active')
    buttons[0].removeAttribute('class', 'active')
})



function checkPage() {
    console.log(window.location.pathname)
    if (window.location.pathname.includes("/user/")) {
        document.getElementById('homeLink').classList.add('invisible')
        document.getElementById('principal_section').classList.add('invisible')
    } else if (window.location.pathname.includes("/deleteuser")) {
        document.getElementById('user_section').classList.add('invisible');
        document.querySelector('#myModal > .modal-content > .buttonsm').classList.add('invisible');
        document.getElementById('myModal').classList.remove('invisible');
        document.querySelectorAll('#myModal > .modal-content > hr')[1].classList.add('invisible');
        document.querySelector('#myModal > .modal-content > h5').innerText = 'Usuario Borrado correctamente';
        document.getElementById('closeButton').addEventListener('click', () => {
            window.location.pathname = ''
        });
    } 
    else {
        document.getElementById('user_section').classList.add('invisible')
    }
}

checkPage()


document.getElementById('delete').addEventListener('click', () => {
    document.getElementById('myModal').classList.remove('invisible')
})

document.getElementById('closeButton').addEventListener('click', () => {
    document.getElementById('myModal').classList.add('invisible')
})

document.getElementById('noButton').addEventListener('click', () => {
    document.getElementById('myModal').classList.add('invisible')
})


document.getElementById('new_register_button').addEventListener('click', () => {
    document.getElementById('new_register').classList.remove('invisible');
    document.getElementById('user_section').classList.add('invisible');
    document.getElementsByTagName('nav')[0].classList.add('invisible')
})

document.getElementById('close_new_register').addEventListener('click', () => {
    document.getElementById('new_register').classList.add('invisible');
    document.getElementById('user_section').classList.remove('invisible');
    document.getElementsByTagName('nav')[0].classList.remove('invisible')
})


document.getElementById('management_button').addEventListener('click', () => {
    window.location.pathname = '/allsavedbirds'

})