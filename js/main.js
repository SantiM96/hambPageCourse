addEventListener('DOMContentLoaded', (event) => {
    //conseguir el ulitmo valor de la url
    let urlNumber = window.location.href.split("/").length
    let url = window.location.href.split("/", urlNumber)[urlNumber - 1].split("?")[0].split("#")[0]
    
    
    let carrito = [];

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

        // Menu default
        let menu = [
            { id: "1", name: "BURGER LA PIXELONETA", img: "img/burgas/burgerpixeloneta.jpg", amount:"1", price: "1980", description: "Esta burger tiene: 240gr de carne, pastrami grillado, huevo, lechuga, tomate, cebolla, ketchup y mayonesa"},
            { id: "2", name: "BURGER DONKEY DONUT", img: "img/burgas/burgerdonkey.jpg", amount:"1", price: "2090", description: "Esta burger tiene: 240gr de carne, doble donuts glaseadas, doble cheddar y doble panceta"},
            { id: "3", name: "BURGER SCORPION", img: "img/burgas/burgerscorpion.jpg", amount:"1", price: "1860", description: "Esta burger tiene: 240gr de carne, BBQ garlic jalapeño, cebolla crispy, doble panceta y cuádruple cheddar y Jalapeño relleno de muzzarella especiada envuelto en panceta"},
            { id: "4", name: "BURGER NOTYOSHI", img: "img/burgas/burgernotyoshi.jpg", amount:"1", price: "1790", description: "Esta burger tiene: pan 100% vegano, medallon a base de plantas, notMayo, guacamole, pico de gallo y cebolla crispy"},
            { id: "5", name: "BURGER FREEZER", img: "img/burgas/burgerfreezer.jpg", amount:"1", price: "2300", description: "Esta burger tiene: 4 medallones de carne, 4 fetas de cheddar, panceta y salsa Stacker"},
            { id: "6", name: "BURGER GAME OVER", img: "img/burgas/burgergameover.jpg", amount:"1", price: "1980", description: "Esta burger tiene: 240 gramos de carne. doble panceta, doble cheddar, salsa Little Mac, lechuga, pickles agridulces y cebolla crispy"}
        ]

        // Asegurarnos de que tengamos "menu" en localStorage
        if (localStorage.getItem('menu')) {
            menu = JSON.parse(localStorage.getItem('menu'))
        } else {
            localStorage.setItem('menu', JSON.stringify(menu))
        }

        const addBtn = (e) => {
            e.preventDefault()
            const currentCard = e.target.parentNode.parentNode.parentNode.parentNode
            const namecart = currentCard.querySelector(".name").textContent
            const menuLocal = JSON.parse(localStorage.getItem("menu"))
            for (const prod of menuLocal) {
                if (prod.name == namecart) {
                    carrito.push(prod)
                    
                }
            }
            
            agregarCarrito()
        }
        
        const printMenu = () => { 
            menuContainer.innerHTML = ''
            for (item of menu) {
                // Usamos template string para inyectar variables en el string (template string => ``)
                menuContainer.innerHTML += `
                    <div class="col">
                        <div class="card shadow-sm">
                            <i class="fa-solid fa-xmark cross"></i>
                            <img src="${item.img}" alt="">
        
                            <div class="card-body">
                                <h4 class="name">${item.name}</h4>
                                <p class="card-text">${item.description}</p>
                                <p class="fs-3 text-end"><b>$<span class="price" style="width: 50%;">${item.price}</span></b></p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-outline-secondary adds">Agregar al carrito</button>
                                        <button type="button" class="btn btn-sm btn-outline-secondary only-admins edits">Editar</button>
                                    </div>
                                    <small class="text-muted"></small>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }

            if (localStorage.getItem('currentAdmin')) { 
                btnIngresarIndex.style.display = 'none';
    
                // Mostrar elementos de admins a los admins
                for (const element of document.querySelectorAll(".only-admins")) {
                    element.classList.remove('only-admins')
                    element.classList.add('show-admins')
                    if (element.classList.contains('edits')) { 
                        element.addEventListener('click', onClickEdit)
                    }
                }
            }

            for (const btn of document.querySelectorAll(".adds")){
                btn.addEventListener("click", addBtn)
            }
        }
        
        // Funciones
        
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
            const newId = Number(menu[menu.length - 1])
            
            if (imgName.value.trim() != "" && imgDescription.value.trim() != "" && imgPrice.value.trim() != "" && imgSource != "" && imgSource != undefined) { 
                if (localStorage.getItem('currentAdmin')) {
                    let objectToAdd = {
                        id: newId,
                        name: imgName.value.trim(),
                        description: imgDescription.value.trim(),
                        price: imgPrice.value.trim(),
                        img: imgSource
                    }
                    menu.push(objectToAdd)
                    printMenu()
                    localStorage.setItem('menu', JSON.stringify(menu))
                    addNewItemMenuForm.reset()
                    previewImg.src = ''
                } else { 
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'No eres admin'
                    })
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Aún faltan campos por completar'
                })
            }
        }

        const onClickEdit = e => { 
            e.preventDefault()
            
            // Reemplazar el contenido de los elementos (title y description) a los inputs
            const clickedCard = e.target.parentNode.parentNode.parentNode.parentNode
            let title = clickedCard.querySelector('h4')
            let oldTitle = title.textContent
            let description = clickedCard.querySelector('.card-text')
            let price = clickedCard.querySelector('.price')
            let crossBtn = clickedCard.querySelector('.cross')
            price.style.display = 'inline-block'
            price.style.marginLeft = '5px'
            let descriptionHeight = description.clientHeight

            let inputTitle = document.createElement('input')
            let inputDescription = document.createElement('textarea')
            let inputPrice = document.createElement('input')

            inputTitle.setAttribute('type', 'text')
            inputTitle.setAttribute('value', title.textContent)
            inputTitle.classList.add('form-control')
            title.innerHTML = ''
            title.appendChild(inputTitle)
            
            inputDescription.setAttribute('type', 'text')
            inputDescription.innerHTML = description.textContent

            inputDescription.classList.add('form-control')
            inputDescription.style.height = descriptionHeight + 'px'
            inputDescription.style.maxHeight = '200px'
            description.innerHTML = ''
            description.appendChild(inputDescription)

            inputPrice.setAttribute('type', 'number')
            inputPrice.setAttribute('value', price.textContent)
            inputPrice.classList.add('form-control')

            price.innerHTML = ''
            price.appendChild(inputPrice)

            // Mostrar Flecha de eliminar
            showCross(crossBtn, oldTitle)

            // Cambiar botón de editar
            const editBtn = clickedCard.querySelector('.edits')
            editBtn.innerHTML = 'Guardar'
            editBtn.removeEventListener('click', onClickEdit)
            editBtn.addEventListener('click', function() { onClickSave(oldTitle, title, description, price) })

        }

        const onClickSave = (oldTitle, title, description, price) => {
            // Formateamos en nuevo arr (newMenu) los items (comidas) con los cambios aplicados y reemplazamos localStorage
            let newMenu = []
            for (let food of menu) {
                if (food.name === oldTitle) {
                    food.name = title.querySelector('input').value
                    food.description = description.querySelector('textarea').value
                    food.price = price.querySelector('input').value
                    newMenu.push(food)
                }  else {
                    newMenu.push(food)
                }
            }
            localStorage.setItem('menu', JSON.stringify(newMenu))
            printMenu()
        }

        const showCross = (crossBtn, oldTitle) => {
            crossBtn.style.display = "block"
            crossBtn.addEventListener('click', () => { 
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                    title: 'Desea eliminar este producto?',
                    text: "No podrás revertir esta acción!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si!',
                    cancelButtonText: 'No!',
                    reverseButtons: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire(
                            'Hecho!',
                            'Su producto ha sido eliminado.',
                            'success'
                        )

                        // Borrar producto seleccionado del menu y guardar en localStorage
                        for (const i in menu) {
                            if (menu[i].name === oldTitle) {
                                menu.splice(i, 1)
                                localStorage.setItem('menu', JSON.stringify(menu))
                                printMenu()
                            }
                        }
                    } else if (
                        /* Read more about handling dismissals below */
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Cancelado',
                            'Su producto se ha conservado',
                            'error'
                        )
                    }
                })
                
            })
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


    // carrito
    
    

    function agregarCarrito() {
        mostrarCarrito()
        for (const btn of document.querySelectorAll(".eliminarProducto")){
            btn.addEventListener("click", eliminarProducto)
        }
    };
    
    function eliminarProducto(e) {
        carrito = carrito.filter((prod) => ("prod" + prod.id) !== e.target.id);
        mostrarCarrito();
        console.log(carrito);
    }

    const mostrarCarrito = () => {
        const modalBody = document.querySelector(".modal .modal-body");
        let precioTotal = 0
        modalBody.innerHTML = "";
        carrito.forEach((prod) => {
            const {id, name, price, img} = prod;
            precioTotal += Number(price)
            console.log(modalBody);
            modalBody.innerHTML += `
                <div class="modal-contenedor">
                    <div>
                        <img class="img-fluid img-carrito" src="${img}"/>
                    </div>
                    <div>
                        <p>Producto: ${name}</p>
                        <p>Precio: $${price}</p>
                        <button class="btn btn-danger eliminarProducto" id="prod${id}">Eliminar producto</button>
                    </div>
                </div>
            `;
            modalBody.querySelector(`#prod${id}`).addEventListener("click", eliminarProducto)
        });
        modalBody.innerHTML += `
            <div class="precio-total"><span>Total:</span> $${precioTotal}</div>
        `;
    }
            
    document.querySelector(".vaciarCarrito").addEventListener("click", () => {
        carrito = []
        mostrarCarrito()
    })
    document.querySelector(".finalizarCompra").addEventListener("click", () => {
        if (carrito.length > 0) {
            console.log(carrito);
            Swal.fire(
                '¡A comeeerlaaa!',
                'Tu compra se ha realizado con éxito',
                'success'
            )
            carrito = []
            mostrarCarrito()
        } else {
            Swal.fire(
                '¡Ups!',
                'Aún no agregaste nada',
                'warning'
            )
        }
    })
                

});
