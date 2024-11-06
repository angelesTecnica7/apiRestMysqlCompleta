// mesaje de operaciones
const mostrarMensaje = (mensaje) => {
    const mytoast = document.querySelector('.toast')
    const contMensaje = document.querySelector('#mensajeRecibido')
    contMensaje.innerHTML = mensaje
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(mytoast)
    toastBootstrap.show()

}
// mostrarMensaje('Buen dia')

const mostrarMensajeEnLinea = (mensaje, tipo) => {
    const contMensaje = document.querySelector('#msj')
    switch (tipo) {
        case 1: contMensaje.className += " bg-success rounded-2";
            break; 
        case 2: contMensaje.className += " bg-danger rounded-2";
                break;
    }
    contMensaje.innerHTML = mensaje
    }

//mostrar formularios Agregar producto
const btnAgregar = document.querySelector('#verFormNuevoProd')
btnAgregar.addEventListener('click', () => {
    //cierro el formulario editar si esta abierto
    document.querySelector('#editarProd').style.display = 'none';
    //abro el fromulario nuevoProducto
    document.querySelector('#nuevoProd').style.display = 'block'
})

//funcion cerrar formularios
const cerrarFormulario = (formularioNro) => {
    switch (formularioNro) {
        case 1: //resetamos mensaje de campos vacios
            document.querySelector('#mensajeNuevoProdVacio').innerHTML = '';
            document.querySelector('#nuevoProd').style.display = 'none'; break
        case 2:
            //resetamos mensaje de campos vacios
            document.querySelector('#mensajeCamposVaciosEditar').innerHTML = '';
            document.querySelector('#editarProd').style.display = 'none'; break
    }

}

// mostrar productos
const endpoint = 'http://localhost:3000/productos' // a donde voy a solicitar los datos
// const endpoint = './json/datos.json' // a donde voy a solicitar los datos
const contenedor = document.querySelector('#cont-prod') // quien necesita los datos
let productos = '' // los datos finales que le voy a entregar al contenedor
// var productosRecibidos
const obtenerDatos = async () => {
    try {
        const respuesta = await fetch(endpoint); //solicito datos
        // console.log(respuesta)

        productosRecibidos = await respuesta.json(); // convierto a json la respuesta con lo cual obtengo los datos, gralmente un objeto/array
        // console.log(datos)

        //itero los elementos del array y genero los datos finales
        productosRecibidos.forEach(prod => {
            productos += `<div class="card m-3" style="width: 100%; max-width: 250px;">
                        <img src="./imagenes/${prod.nbr}.jpg" class="card-img-top" alt="bananas">
                        <div class="card-body d-flex flex-column align-items-start">
                            <h5 class="card-title">${prod.nbr}</h5>
                            <p class="card-text">${prod.descripcion}</p>
                            <div class="mt-auto">
                                <div d-flex flex-row justify-content-between w-100>
                                    <p><b>$ ${prod.precio}</b></p>
                                    <button class="btn btn-primary" onclick="editarProductoFront(${prod.id})"><i class="bi bi-pencil"></i></button>
                                    <button class="btn btn-primary" onclick="eliminar(${prod.id})"><i class="bi bi-trash3"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>`;
        });

        //agregro los datos al html final
        contenedor.innerHTML = productos

    } catch (error) {
        // console.log(error)
        // document.querySelector('#msj').innerHTML = 'Error al Cargar los producto';
        mostrarMensajeEnLinea('Error al Cargar los producto', 2)
        mostrarMensaje('Error al Cargar los producto')
    }


}

obtenerDatos()

//Agregar Nuevo Producto
const formulario = document.forms['formNuevoProducto'];
// console.log(formulario)

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    //obtengo los datos ingresados en el formulario
    let nombre = formulario.nombre.value
    let descripcion = formulario.descripcion.value
    let precio = formulario.precio.value

    //creo un objeto con los datos
    let nuevosDatos = { nbr: nombre, descripcion: descripcion, precio: precio }

    //validamos para que los campos no esten vacios
    if (!nuevosDatos.nbr || !nuevosDatos.descripcion || !nuevosDatos.precio) {
        document.querySelector('#mensajeNuevoProdVacio').innerHTML = 'Debe completar todos los campos';
        return;
    }

    //resetamos mensaje de campos vacios
    document.querySelector('#mensajeNuevoProdVacio').innerHTML = '';

    //convierto el objeto a json para enviarlo a traves de la API fetch al backend
    let nuevosDatosJson = JSON.stringify(nuevosDatos)
    // console.log(nuevosDatosJson)

    //envio los datos al backend
    const enviarNvoProd = async () => {
        try {
            const enviarDatos = await fetch(endpoint, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: nuevosDatosJson
            })
            //obtengo la respuesta del backend
            const respuesta = await enviarDatos.json()
            // console.log(respuesta)

            //mostrar mensaje nuevo producto ingresado
            mostrarMensaje(respuesta.mensaje)
            mostrarMensajeEnLinea(respuesta.mensaje, 1)

        } catch (error) {
            // console.log(error)
            mostrarMensaje('Error al crear nuevo producto')
            mostrarMensajeEnLinea('Error al crear nuevo producto', 2)
        }

        document.querySelector('#formNuevoProducto').reset(); //limpia formulario

        document.querySelector('#nuevoProd').style.display = 'none' //ocultar formulario

        setTimeout(() => { location.reload(); }, 1500)    // refrescar pagina
        // location.reload();

    }

    enviarNvoProd()

})

// editar productos 1ra parte: Abrir formulario con los datos actuales del producto a editar
const editarProductoFront = (id) => {

    //cierro el formulario nuevoProducto si esta abierto
    document.querySelector('#nuevoProd').style.display = 'none'

    // console.log(id)
    let productoEditar = {} // contenedor de los datos del producto a editar

    //recorre el array de productos para obterner los datos del producto a editar para llenar luego el formulario
    productosRecibidos.filter(prod => {
        if (prod.id == id) {
            productoEditar = prod
        }
    })
    // productosRecibidos.filter(prod => prod.id == id ? productoEditar = prod : false) // en 1 linea

    // asignamos valores a los campos del formulario
    const formEditar = document.forms['formEditar'];

    formEditar.idEditar.value = productoEditar.id
    formEditar.nombre.value = productoEditar.nbr
    formEditar.descripcion.value = productoEditar.descripcion
    formEditar.precio.value = productoEditar.precio

    // console.log(productoEditar)
    // console.log(formEditar.idEditar.value)

    //abrir formulario
    document.querySelector('#editarProd').style.display = 'block'

    //me desplazo al formulario
    window.scroll({
        top: 100,
        behavior: "smooth",
    });
}



// editar productos 2da parte: enviar al backend los nuevos datos para que actualize el archivo json
const formEditar = document.forms['formEditar'];

formEditar.addEventListener('submit', (event) => {
    event.preventDefault();

    const nuevosDatos = { 
        nbr: formEditar.nombre.value,
        descripcion: formEditar.descripcion.value,
        precio: formEditar.precio.value,
        id: formEditar.idEditar.value
    }
    //validamos para que los campos no esten vacios
    if (!nuevosDatos.nbr || !nuevosDatos.descripcion || !nuevosDatos.precio) {
        document.querySelector('#mensajeCamposVaciosEditar').innerHTML = 'Debe completar todos los campos';
        return;
    }

    //resetamos mensaje de campos vacios
    document.querySelector('#mensajeCamposVaciosEditar').innerHTML = '';

    //convierto el objeto a json para enviarlo a traves de la API fetch al backend
    let nuevosDatosJson = JSON.stringify(nuevosDatos)
    // console.log(nuevosDatosJson)

    //envio los datos al backend
    const enviarNvoDatos = async () => {
        try {
            // const enviarDatos = await fetch(endpoint + '/' + nuevosDatos.id, {
            const enviarDatos = await fetch(endpoint, {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: nuevosDatosJson
            })
            //obtengo la respuesta del backend
            const respuesta = await enviarDatos.json()
            // console.log(respuesta)

            //mostrar mensaje producto ACTUALIZADO
            mostrarMensaje(respuesta.mensaje)

        } catch (error) {
            // console.log(error)
            mostrarMensaje('Error al ACTUALIZAR producto')
        }

        document.querySelector('#formEditar').reset(); //limpia formulario

        document.querySelector('#formEditar').style.display = 'none' //ocultar formulario

        setTimeout(() => { location.reload(); }, 1000)    // refrescar productos
        // location.reload();

    }
    enviarNvoDatos()
})

//Eliminar producto
const eliminar = (id) => {
    if (confirm('seguro desea eliminar')) {
        // console.log('eliminamos prod id = ' + id)

        console.log(endpoint + '/' + id)

        //envio los datos al backend
        const eliminarProd = async () => {
            try {
                const res = await fetch(endpoint + '/' + id, {
                    method: 'delete'
                })

                //obtengo la respuesta del backend
                const respuesta = await res.json()
                // console.log(respuesta)

                //mostrar mensaje producto ELIMINADO
                mostrarMensaje(respuesta.mensaje)

            } catch (error) {
                // console.log(error)
                mostrarMensaje('Error al ELIMINAR producto')
            }

            setTimeout(() => { location.reload(); }, 1000)    // refrescar productos
            // location.reload();

        }

        eliminarProd()

    } 
}