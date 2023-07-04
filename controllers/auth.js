// const express = require("express");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

//const crearUsuario = (req, res = express.response) => {
const crearUsuario = async (req, res = response) => {
  //console.log(req);
  //console.log(req.body); // esto lo uso para comprobar cómo es mi request
  //const { name, email, password } = req.body;
  const { email, password } = req.body;

  try {
    //let usuario = Usuario.findOne({email: email});
    let usuario = await Usuario.findOne({ email }); //sería lo mismo que {email: email}
    // lo pongo con let pq dps la renombro
    // si no encuentra ese email del usuario, devuelve null
    //console.log(usuario);

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo",
      });
    }

    // crearé una nueva instancia de mi usuario / en el body de la request viene mi name, mi email y mi password, es decir, lo que en la prueba con postman le pongo en el body para enviar
    usuario = new Usuario(req.body);
    //console.log(usuario);

    // encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    //console.log(usuario);
    usuario.shortName = "";
    usuario.isAdmin = false;
    usuario.isActivated = false;
    usuario.isDataModifier = false;
    usuario.isTechnician = false;
    usuario.canFLC = false;
    usuario.canSeeStatistics = false;
    usuario.isStillWorking = true;

    await usuario.save(); // será una promesa (save graba ese usuario en la base de datos)

    // aquí se generará nuestro token JWT pq también lo quiero mandar en la response de regreso cuando alguien lo crea para autenticarme inmediatamente
    const token = await generarJWT(usuario.id, usuario.name);

    //aplicaré reglas de validación,
    //podría hacerlo manualmente pero lo haré con express-validator
    // if (name.length < 5) {
    //   return res.status(400).json({
    //     ok: false,
    //     msg: "El nombre debe tener 5 letras como mínimo",
    //   });
    // }

    res.status(201).json({
      ok: true,
      //msg: "register",
      //user: req.body,
      /*  name,
    email,
    password, */
      uid: usuario.id, // esto es lo que quiero devolver en la response cuando cree un nuevo usuario
      name: usuario.name,
      token: token, // aquí podría ponerse solo token,
      ...usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      //status(500) es un error interno
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email }); //sería lo mismo que {email: email}

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Este usuario no existe con este email, es un ente incorpóreo e inanimado, vamos, de mentira total",
        // he de evitar dar pistas de si es el usuario o la contraseña lo que falla, pero aquí, para mí, me ha interesado ponerlo
      });
    }

    // confirmar los passwords
    // bcrypt.compareSync compara la contraseña q he escrito con la de la base de datos
    const validPassword = bcrypt.compareSync(password, usuario.password);
    console.log(validPassword);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña no es correcta, aunque de nuevo no es aconsejable dar pistas al usuario pa q no trampee el muy tunante",
      });
    }

    // si llega hasta aquí es pq el usuario y la contraseña eran correctos
    // aquí se generará nuestro token JWT
    const token = await generarJWT(usuario.id, usuario.name);

    // una vez creado el JWT
    res.status(201).json({
      ok: true,
      uid: usuario.id, // esto es lo que quiero devolver en la response cuando cree un nuevo usuario
      name: usuario.name,
      token: token, // aquí podría ponerse solo token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      //status(500) es un error interno
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }

  // res.status(201).json({
  //   ok: true,
  //   msg: "login",
  //   email,
  //   password,
  // });
};

// este endpoint se usará para revalidar el token y darle una vigente de 2 horas más (p.e.)
// me servirá para saber si el token es válido y mantener el usuario loggeado y a su vez renovarlo
const revalidarToken = async (req, res = response) => {
  // const uid = req.uid;
  // const name = req.name;
  const { uid, name } = req; // de la request extraigo el uid y el name

  // ahora se genera un nuevo JWT y lo devuelve en esta petición
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    // msg: "renew (del token)",
    /*  uid, // uid: uid,
    name, // name: name, */ // esto se puso para comprobar
    uid,
    name,
    token,
  });
};

module.exports = { crearUsuario, loginUsuario, revalidarToken }; //esto sería lo mismo que crearUsuario:crearUsuario, ....
