const express = require("express");
// const dotenv = require("dotenv").config(); //se podría hacer así también y después llamar a dotenv
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

// esto muestra todos los procesos q tengo corriendo
// console.log(process.env);

//CREAR EL SERVIDOR DE EXPRESS
const app = express();
//console.log(app);

//CORS
app.use(cors());

//DIRECTORIO PÚBLICO
app.use(express.static("public"));

//LECTURA Y PARSEO DEL BODY
app.use(express.json());

//BASE DE DATOS
dbConnection();

//RUTAS
// esto es lo que hice al principio y funcionaba
// app.get("/", (req, res) => {
//   res.json({
//     ok: true,
//   });
// });

// todo lo que require("./routes/auth") va a exportar,
// lo va a habilitar en la ruta "/api/auth".
// es decir, si la ruta es /api/auth en el navegador o en postman,
// considerará que "/"" del router.get del archivo /routes/auth será ese /api/auth (esto es un poco difícil de entender)
app.use("/api/auth", require("./routes/auth"));
// esta será la ruta de los eventos
app.use("/api/events", require("./routes/events"));
app.use("/api/courses", require("./routes/courses"));

// si no es ninguna de las rutas anteriores, entrará aquí (por el *)
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

//ESCUCHAR PETICIONES
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
