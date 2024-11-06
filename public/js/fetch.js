// const endpoint = 'http://localhost:3000/productos' // con una api rest en backend, es el app.get()
// const endpoint = './json/datos.json' // en local ejecutando con live server
const endpoint = './../data/datos.json' // no funciona con el servidor (backend) porque solo se ve el souce (la rama) dentro del public. SIN FUNCIONA CON LIVE SERVER

//1ra forma sincronica SIN PROMESAS
fetch(endpoint)  //solicitud de datos en este endpoint
    .then(datos => datos.json())  // al la respuesta la convierto en json
    .then(datos => console.log(datos)) //muestro la respuesta en consola

// 2DA FORMA: CON PROMESAS async/await
const obtenerDatos = async () => {
    datos = await fetch(endpoint)
    datos = await datos.json()
    console.log(datos)
}
obtenerDatos()

// 3RA FROMA COMPLETA: CON PROMESAS async/await , try/catch
const obtenerDatos2 = async () => {
    try {
        datos = await fetch(endpoint)
        datos = await datos.json()
        console.log(datos)
    } catch (error) {
        console.log(error)
        console.log('error al consultar datos')
    }
}
obtenerDatos2()
