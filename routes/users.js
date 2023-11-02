/*
    Users routes / Rutas de usuarios
    host + /api/users
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getUsuarios,
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/users");

router.use(validarJWT);

router.get("/", getUsuarios);

router.put(
  "/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check(
      "shortName",
      "Es obligatorio especificar el nombre breve del trabajador"
    )
      .not()
      .isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "isAdmin",
      "Es obligatorio especificar si el usuario es el administrador"
    )
      .not()
      .isEmpty(),
    check(
      "isActivated",
      "Es obligatorio especificar si el usuario está activado"
    )
      .not()
      .isEmpty(),
    check(
      "isDataModifier",
      "Es obligatorio especificar si el usuario puede modificar datos"
    )
      .not()
      .isEmpty(),
    check(
      "isTechnician",
      "Es obligatorio especificar si el usuario es un técnico"
    )
      .not()
      .isEmpty(),
    check(
      "canFLC",
      "Es obligatorio especificar si el usuario puede impartir FLC"
    )
      .not()
      .isEmpty(),
    check(
      "canSeeStatistics",
      "Es obligatorio especificar si el usuario puede ver estadísticas"
    )
      .not()
      .isEmpty(),
    check(
      "isStillWorking",
      "Es obligatorio especificar si el usuario está de alta en MPE"
    )
      .not()
      .isEmpty(),
    check("isExternal", "Es obligatorio especificar si el usuario es de MPE")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  actualizarUsuario
);

router.delete("/:id", eliminarUsuario);

module.exports = router;
