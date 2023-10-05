/*
    Rutas de Usuarios / Auth
    host + /api/auth (es decir, localhost:..../api/auth)
*/

// puedo hacerlo de una de estas dos formas:
// const express = require("express");
// const router = express.Router();

const { Router } = require("express"); //desestructuro Router
const { check } = require("express-validator"); //desestructuraré de express-validator
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  actualizarPasswordUsuario,
} = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

//usaré router en vez de app
router.post(
  "/new",
  [
    //mis middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password ha de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos, //será otro middleware con su next
  ],
  crearUsuario
);
//si hiciera un post, lo que devuelve res.json sería lo que quiero
//que devuelva cuando haga ese posteo

router.post(
  "/",
  [
    //mis middlewares
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password ha de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

// si donde va validarJWT fuera más de un middleware, lo pondría entre []
router.get("/renew", validarJWT, revalidarToken);

router.patch(
  "/",
  [
    //mis middlewares
    //check("email", "El email es obligatorio").isEmail(),
    check("password", "El password ha de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  actualizarPasswordUsuario
);

module.exports = router;
