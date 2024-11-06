const mysql = require('mysql2');

const conexion = mysql.createConnection({
  // host: "localhost",
  // user: "root",
  // password: "",
  // database: "tienda2024"

  host: process.env.MYSQL_ADDON_HOST || "localhost",
  user: process.env.MYSQL_ADDON_USER || "root",
  password: process.env.MYSQL_ADDON_PASSWORD || "",
  database: process.env.MYSQL_ADDON_DB || "tienda2024",
  connectionLimit: 5 // 5 conexiones sumultaneas limitacion de cuenta free clever-cloud
});

conexion.connect((err) => {
  if (err){
    console.error("error al conectarse con la base de datos");
    return;
}
  console.log("Conectados :)");
});


module.exports = conexion;