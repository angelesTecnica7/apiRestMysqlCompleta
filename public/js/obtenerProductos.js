fetch('./json/datos.json') //solicitud de datos en este endpoint
.then(res => res.json()) // al la respuesta la convierto en json
// .then(datos =>console.log(datos)) //muestra el array datos en consola
.then(datos => mostrarProducto(datos))
.catch((error)=>{
  console.log(error)
})

const mostrarProducto = (datos) => {
    const contenedorProductos = document.getElementById('cont-prod');
    let productos = '';
    datos.forEach(dato => {
        productos += `<div class="card m-3" style="width: 100%; max-width: 250px;">
            <img src="./imagenes/${dato.nbr}.jpg" class="card-img-top" alt="bananas">
            <div class="card-body d-flex flex-column align-items-start">
              <h5 class="card-title">${dato.nbr}</h5>
              <p class="card-text">${dato.descripcion}</p>
              <a href="#" class="btn btn-primary mt-auto">comprar</a>
            </div>
          </div>`;
    });
    contenedorProductos.innerHTML = productos;
}





