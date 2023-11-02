/*
    Rutas de Usuarios / Auth
    host + /api/auth 
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  actualizarPasswordUsuario,
  restaurarPasswordUsuario,
} = require("../controllers/auth");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password ha de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  crearUsuario
);

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password ha de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUsuario
);

router.get("/renew", validarJWT, revalidarToken);

router.patch("/:id", restaurarPasswordUsuario);

router.patch(
  "/",
  [
    check("password", "El password ha de ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  actualizarPasswordUsuario
);

module.exports = router;
