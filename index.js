const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

dbConnection();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
app.use("/api/courses", require("./routes/courses"));
app.use("/api/users", require("./routes/users"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
