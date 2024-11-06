const express = require('express')
const db = require('./db/conexion');

const fs = require('fs')
const cors = require('cors')

const app = express();
const port = 3000

//middleware para interpretar el json que envia la petición post
app.use(express.json({ type: "*/*" }))
app.use(cors())
app.use(express.static('./public')) //carpeta que contiene el front



app.get("/productos", (req, res) => {
    // const datos = leerDatos()
    // res.json(datos.productos)

    const sql = "SELECT * FROM productos";
    db.query(sql, (err, result) => {
        if (err) {
            console.error('Error al acceder a la tabla productos');
            return;
        }
        // console.log(result)
        res.json(result);

    })
})

app.get("/productos/:id", (req, res) => {
    // const id = req.params.id
    // const datos = leerDatos()
    // const prodBuscado = datos.productos.find((p) => p.id == id)
    // res.json(prodBuscado)
})

app.get("/admin", (req, res) => {
    // console.log(__dirname)
    res.sendFile(__dirname + '/public/administracion.html')

})

app.post("/productos", (req, res) => {
    // console.log(req.body)
    // console.log(Object.values(req.body))
    const valores = Object.values(req.body);
    const sql = "INSERT INTO productos (nbr, descripcion, precio) VALUES(?,?,?)"
    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error('error al guardar registro');
            return;
        }
        res.json({
            mensaje: 'Nuevo Producto Agregado',
            data: result
        })
    })
})

app.put("/productos", (req, res) => {
    const valores = Object.values(req.body);
    console.log(valores)
    const sql = "UPDATE productos SET nbr=?, descripcion=?, precio=? WHERE id=?";
    db.query(sql, valores, (err, result) => {
        if (err) {
            console.error('error al MODIFICAR registro');
            return;
        }
        res.json({
            mensaje: 'Producto ACTUALIZADO',
            data: result
        })
    })
})

app.delete("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id)
    // console.log(id)

    const sql = "DELETE FROM productos WHERE id=?";
    db.query(sql, [id], (err) => {
        if (err) {
            console.error('error al ELIMINAR registro');
            return;
        }
        res.json({
            mensaje: 'Producto ELIMINADO'
        })
    })
    
})

app.listen(port, () => {
    console.log(`Servidor en el puerto ${port}`)
})