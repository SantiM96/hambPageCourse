addEventListener('DOMContentLoaded', (event) => {
    //conseguir el ulitmo valor de la url
    let urlNumber = window.location.href.split("/").length
    let url = window.location.href.split("/", urlNumber)[urlNumber - 1].split("?")[0].split("#")[0]
    

    // Admins
    let initialsAdmins = [
        {user: "Mark", pass: "123", name: "Mark", lastName: "Sanchez"},
        {user: "Carlos38", pass: "456789", name: "Carlos", lastName: "Rodriguez"},
        {user: "Roberto24", pass: "456789", name: "Roberto", lastName: "Lopez"}
    ]

    if (localStorage.getItem('admins') === null) {
        localStorage.setItem('admins', JSON.stringify(initialsAdmins))
    }


    // javascript de index.html
    if(url === "index.html") {
    
        const menuContainer = document.querySelector("#menu")
        const btnIngresarIndex = document.querySelector("#btnIngresarIndex")
        const previewImg = document.querySelector("#preview")
        const btnAddNewItemMenu = document.querySelector("#btnAddNewItemMenu")
        const addNewItemMenuForm = document.querySelector(".addNewItemMenuForm")
        let imgName = document.querySelector('#imgName')
        let imgDescription = document.querySelector('#imgDescription')
        let imgPrice = document.querySelector('#imgPrice')
        let imgUpload = document.querySelector('#imgUploaded')
        let imgSource

        let menu = [
            {name: "BURGER LA PIXELONETA", img: "img/burgas/burgerpixeloneta.jpg", price: "1980", description: "Esta burger tiene: 240gr de carne, pastrami grillado, huevo, lechuga, tomate, cebolla, ketchup y mayonesa"},
            {name: "BURGER DONKEY DONUT", img: "img/burgas/burgerdonkey.jpg", price: "2090", description: "Esta burger tiene: 240gr de carne, doble donuts glaseadas, doble cheddar y doble panceta"},
            {name: "BURGER SCORPION", img: "img/burgas/burgerscorpion.jpg", price: "1860", description: "Esta burger tiene: 240gr de carne, BBQ garlic jalapeño, cebolla crispy, doble panceta y cuádruple cheddar y Jalapeño relleno de muzzarella especiada envuelto en panceta"},
            {name: "BURGER NOTYOSHI", img: "img/burgas/burgernotyoshi.jpg", price: "1790", description: "Esta burger tiene: pan 100% vegano, medallon a base de plantas, notMayo, guacamole, pico de gallo y cebolla crispy"},
            {name: "BURGER FREEZER", img: "img/burgas/burgerfreezer.jpg", price: "2300", description: "Esta burger tiene: 4 medallones de carne, 4 fetas de cheddar, panceta y salsa Stacker"},
            {name: "BURGER GAME OVER", img: "img/burgas/burgergameover.jpg", price: "1980", description: "Esta burger tiene: 240 gramos de carne. doble panceta, doble cheddar, salsa Little Mac, lechuga, pickles agridulces y cebolla crispy"}
        ]


        // Funciones
        const printMenu = () => { 
            menuContainer.innerHTML = ''
            for(item of menu){
                menuContainer.innerHTML +=`    
                    <div class="col">
                        <div class="card shadow-sm">
                        <img src="${item.img}" alt="">
    
                        <div class="card-body">
                            <h4>${item.name}</h4>
                            <p class="card-text">${item.description}</p>
                            <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" class="btn btn-sm btn-outline-secondary">Agregar al carrito</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-muted"></small>
                            </div>
                        </div>
                        </div>
                    </div>
                    `
            }
        }
        
        const processedImg = e => {
            let reader = new FileReader();
            let image = e.target.files[0];
            reader.readAsDataURL(image);
            reader.addEventListener('load', ev => { 
                imgSource = ev.target.result;
                previewImg.src = imgSource
            });
        }

        const addNewItemMenu = e => { 
            e.preventDefault()
            if (imgName.value.trim() != "" && imgDescription.value.trim() != "" && imgPrice.value.trim() != "" && imgSource != "" && imgSource != undefined) { 
                let objectToAdd = {
                    name: imgName.value.trim(),
                    description: imgDescription.value.trim(),
                    price: imgPrice.value.trim(),
                    img: imgSource
                }
                menu.push(objectToAdd)
                printMenu()
                addNewItemMenuForm.reset()
                previewImg.src = ''
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Aún faltan campos por completar'
                })
            }
        }

        
        // Listeners
        imgUpload.addEventListener('change', processedImg)
        btnAddNewItemMenu.addEventListener('click', addNewItemMenu)


        // Esconder botón de ingresar cuando hay un admin logeado
        if (localStorage.getItem('currentAdmin')) { 
            btnIngresarIndex.style.display = 'none';
        }

        printMenu()

        
    }
    
   
    // javascript del login.html
    if(url === "login.html") {
        
        // const menuContainer = document.querySelector("#login")

        let admins = JSON.parse(localStorage.getItem('admins'))
        
        const userEl = document.querySelector("#user")
        const passwordEl = document.querySelector("#password")
        const btnIngresar = document.querySelector("#btnIngresar")


        // Validación del Admin
        btnIngresar.addEventListener("click", (e) => { 
            e.preventDefault()
            for (let admin of admins) {
                if ((admin.user.trim() == userEl.value.trim()) && (admin.pass.trim() == passwordEl.value.trim())) {
                    localStorage.setItem('currentAdmin', JSON.stringify(admin))
                    Swal.fire({
                        icon: 'success',
                        title: 'Correcto',
                        text: 'Te has logeado correctamente'
                    }).then(() => {
                        console.log("le di al ok")
                        location.href = '../index.html';
                    })
                    return
                } else { 
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El mail o la contraseña son incorrectas'
                    })
                }
            }
        })
       
    }



});
