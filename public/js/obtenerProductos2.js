
const endpoint = 'http://localhost:3000/productos' // a donde voy a solicitar los datos
const contenedor = document.querySelector('#cont-prod') // quien necesita los datos
var productos = '' // los datos finales que le voy a entregar al contenedor

const obtenerDatos = async () => {
    try {
        const respuesta = await fetch(endpoint); //solicito datos
        // console.log(respuesta)
        const datos = await respuesta.json(); // convierto a json la respuesta con lo cual obtengo los datos, gralmente un objeto/array
        // console.log(datos)

        //itero los elementos del array y genero los datos finales
        datos.forEach(dato => {
            productos += `<div class="card m-3" style="width: 100%; max-width: 250px;">
            <img src="./imagenes/${dato.nbr}.jpg" class="card-img-top" alt="bananas">
            <div class="card-body d-flex flex-column align-items-start">
              <h5 class="card-title">${dato.nbr}</h5>
              <p class="card-text">${dato.descripcion}</p>
              <div class="mt-auto d-flex flex-row justify-content-between align-items-baseline w-100">
              <p><b>$ ${dato.precio}</b></p>
              <a href="#" class="btn btn-primary">comprar</a>
              </div>
            </div>
          </div>`;
        });

        //agregro los datos al html final
        contenedor.innerHTML = productos

    } catch (error) {
        console.log(error)
    }


}

obtenerDatos()