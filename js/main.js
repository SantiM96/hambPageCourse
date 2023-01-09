addEventListener('DOMContentLoaded', (event) => {
    //conseguir el ulitmo valor de la url
    let urlNumber = window.location.href.split("/").length
    let url = window.location.href.split("/", urlNumber)[urlNumber - 1].split("?")[0].split("#")[0]
    
    // javascript de index.html
    if(url === "index.html") {
        
    
    
        const menuContainer= document.querySelector("#menu")
        
        
        let menu=[
            {name: "BURGER LA PIXELONETA", img: "img/burgas/burgerpixeloneta.jpg", price: "1980", description: "Esta burger tiene: 240gr de carne, pastrami grillado, huevo, lechuga, tomate, cebolla, ketchup y mayonesa"},
            {name: "BURGER DONKEY DONUT", img: "img/burgas/burgerdonkey.jpg", price: "2090", description: "Esta burger tiene: 240gr de carne, doble donuts glaseadas, doble cheddar y doble panceta"},
            {name: "BURGER SCORPION", img: "img/burgas/burgerscorpion.jpg", price: "1860", description: "Esta burger tiene: 240gr de carne, BBQ garlic jalapeño, cebolla crispy, doble panceta y cuádruple cheddar y Jalapeño relleno de muzzarella especiada envuelto en panceta"},
            {name: "BURGER NOTYOSHI", img: "img/burgas/burgernotyoshi.jpg", price: "1790", description: "Esta burger tiene: pan 100% vegano, medallon a base de plantas, notMayo, guacamole, pico de gallo y cebolla crispy"},
            {name: "BURGER FREEZER", img: "img/burgas/burgerfreezer.jpg", price: "2300", description: "Esta burger tiene: 4 medallones de carne, 4 fetas de cheddar, panceta y salsa Stacker"},
            {name: "BURGER GAME OVER", img: "img/burgas/burgergameover.jpg", price: "1980", description: "Esta burger tiene: 240 gramos de carne. doble panceta, doble cheddar, salsa Little Mac, lechuga, pickles agridulces y cebolla crispy"}
        ]

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
    
   
   
    // javascript del login.html
    if(url === "login.html") {
        
        const menuContainer= document.querySelector("#login")

        const btnRegister= document.querySelector(".register")
        
        btnRegister.addEventListener("click", (e) =>{
            e.preventDefault() 


            Swal.fire({
                title: 'Registrarse',
                input: 'text',
                // input: 'email',
                inputAttributes: {
                autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Confirmar',
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                return fetch(`//api.github.com/users/${login}`)
                    .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                    })
                    .catch(error => {
                    Swal.showValidationMessage(
                        `Request failed: ${error}`
                    )
                    })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {
                if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                })
                }
            })
        })
       
    }
    


























});
