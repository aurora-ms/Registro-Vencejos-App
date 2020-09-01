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
    if(window.location.pathname.includes("/user/"))
    { 
        document.getElementById('homeLink').classList.add('invisible')
        document.getElementById('principal_section').classList.add('invisible')
    } else {
        document.getElementById('user_section').classList.add('invisible')
       
    }
}

checkPage()
