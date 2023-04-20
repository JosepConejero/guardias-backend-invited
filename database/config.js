const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env
        .DB_CONNECTION /* , {//esto no funciona pq la versión de mongoose es distinta pero fernando ha añadido el useCreateIndex: true
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    } */
    ); // todo esto retornará una promesa, por eso pongo lo del await
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar la base de datos");
  }
};

module.exports = { dbConnection };
