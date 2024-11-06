const mysql = require('mysql2');

const conexion = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tienda2024"
});

conexion.connect((err) => {
  if (err){
    console.error("error al conectarse con la base de datos");
    return;
}
  console.log("Conectados :)");
});


module.exports = conexion;