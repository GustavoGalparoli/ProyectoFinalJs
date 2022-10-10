
const contenedorProductos = document.getElementById('contenedor-productos')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
        
    }
})
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})

stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Comprar</button>

    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
        //Agregue el toastify para que notifique cada vez que se agregan productos al carrito
        Toastify({

            text: "Se agrego al Carrito",
            
            duration: 2000,
    
            style:{
                fontSize: "15px",
                fontFamily: "Calibri",
                color: "white",
                background: "#3B7874",
                //background: "linear-gradient(0deg, rgba(34,64,195,1) 0%, rgba(253,45,94,1) 95%)",
            }
            
            }).showToast();  
    
    })
      
})


const agregarAlCarrito = (prodId) => {
    const existe = carrito.some (prod => prod.id === prodId) //comprobar si el elemento ya existe en el carro
    if (existe){
        const prod = carrito.map (prod => { 
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }

    actualizarCarrito()
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)
    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1)
    actualizarCarrito()
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "" 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <img src=${prod.img} alt= "" class="img_carrito">
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>    
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    
    contadorCarrito.innerText = carrito.length 
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
  

}


let contenedor_clima = document.getElementById("clima");

    fetch("https://api.openweathermap.org/data/2.5/weather?q=Buenos Aires&units=metric&appid=acadc92751e50ee2eef2fd8cda3417af")
    .then( response => response.json())
    .then( data => {
        console.log(data);
        contenedor_clima.innerHTML = `<p> Ciudad: ${data.name}</p>
                                      <p> Temp: ${data.main.temp}</p>`;
    })
