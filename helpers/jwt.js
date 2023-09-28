const jwt = require("jsonwebtoken");
// esta librería trabaja con callbacks, no con promesas,
// aq hay una mra d hacer q trabaje como queremos

// en esta función debería recibir lo que yo
// necesito colocar como payload de mi token
// (una de las tres partes del JWT), es decir,
// el id del usuario uid y el nombre name
const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      //{ expiresIn: "2h" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token"); //si no va bien, devuelve este mensaje de error
        }
        resolve(token); //si todo va bien, devuelve el token
      }
    );
    // le paso el payload, la palabra secreta,
    // un objeto con una ppdad q indice cuándo expirará el token
    // y por último una callback q se va a disparar cuando se produzca un error
  });
};

module.exports = { generarJWT };
