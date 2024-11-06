const express = require('express')
const fs = require('fs')
const cors = require('cors')

const app = express();
const port = 3000

//middleware para interpretar el json que envia la petición post
app.use(express.json({type : "*/*"}))
app.use(cors())
app.use(express.static('./public')) //carpeta que contiene el front

const leerDatos = () => {
    try {
        const datos = fs.readFileSync('./public/data/datos.json')
        return JSON.parse(datos)
    } catch (error) {
        console.log(error)
    }

}

const escribirDatos = (datos) => {
    try {
        fs.writeFileSync('./public/data/datos.json', JSON.stringify(datos))
    } catch (error) {
        console.log(error)
    }
}

app.get("/productos", (req, res) => {
    // res.send('Listando productos')
    const datos = leerDatos()
    res.json(datos.productos)
})

app.get("/productos/:id", (req, res) => {
    // res.send('Listando un productos')
    const id = req.params.id
    const datos = leerDatos()
    const prodBuscado = datos.productos.find((p) => p.id == id)
    res.json(prodBuscado)
})

app.get("/admin", (req, res) => {
    // console.log(__dirname)
    res.sendFile(__dirname + '/public/administracion.html')
    
})

app.post("/productos", (req, res) => {
    const datosBody = req.body
    // console.log(datosBody)
    const datos = leerDatos()
    const nuevoProd = {
        id: datos.productos.length + 1,
        ...datosBody,
    }
    datos.productos.push(nuevoProd)
    escribirDatos(datos)
    res.json({mensaje: 'Producto registrado', producto: nuevoProd})
})

app.put("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const body = req.body
    // console.log(id, body)
    const datos = leerDatos()
    const prodIndice = datos.productos.findIndex((p) => p.id === id)
    // console.log(prodIndice)

    datos.productos[prodIndice] = {
        ...datos.productos[prodIndice],
        ...body,
    }

    escribirDatos(datos)

    res.json({
        mensaje: "Datos Actulizados",
        producto: datos.productos[prodIndice],
    })
})

app.delete("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    // console.log(id)
    const datos = leerDatos()
    const prodIndice = datos.productos.findIndex((p) => p.id === id)
    // console.log(prodIndice)
    datos.productos.splice(prodIndice, 1)

        //funcion para reindexar producto, que los id sean consecutivos comenzando desde el 1
        let indice = 1
        datos.productos.map((p)=>{
            p.id = indice
            indice++
        })
    
    escribirDatos(datos)
    res.json({
        mensaje: "Datos ELIMINADOS"
    })
})

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
})