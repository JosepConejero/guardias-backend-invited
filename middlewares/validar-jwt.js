const { response } = require("express");
const jwt = require("jsonwebtoken");

// next es la función q yo tengo q llamar si el token que voy a recibir aquí es correcto
// si no, generaré una nv response
const validarJWT = (req, res = response, next) => {
  // primero decidiré cómo voy a recibir el JWT
  // nosotros lo haremos a través del x-token (key/value) en los headers
  const token = req.header("x-token"); // leeré la key "x-token" del header que mando en la request
  //console.log(token); //para comprobar el token recibido a través del header

  //ahora vamos a validar el token
  if (!token) {
    return res.status(401).json({
      // 401 es q no está autenticado
      ok: false,
      msg: "No hay token en la petición",
    });
  }
  try {
    // extraigo el payload pq me interesa el uid del usuario (con él sé qué usuario es)
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
    // la verificación del token podría fallar si alguien ha modificado alguna de sus parte
    // también podría fallar la verificación si el token ha expirado
    //console.log(payload); // el payload tendrá el uid, el name, iat y exp
    // aquí modificaré la request añadiéndole uid
    req.uid = payload.uid; //podría desestructurar uid y name donde pone payload en la línea de arriba
    req.name = payload.name;
    // arriba podría poner const {uid, name} = jwt.verify....
    // y dps req.uid = uid; y req.name = name;
  } catch (error) {
    //el catch solo se disparará si la validación falla
    return res.status(401).json({
      ok: false,
      msg: "Token no válido",
    });
  }

  next(); // si todo está correcto, llamará a lo que siga y
  // le pasaré la req con los nuevos datos que he puesto de uid y name
  // o sea, le pasaré esta request modificada a renewToken
  // (lo que venía a continuación en router.get("/renew"))
};

module.exports = { validarJWT };
