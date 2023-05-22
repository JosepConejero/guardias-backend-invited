/*
    Users routes / Rutas de usuarios
    host + /api/users (es decir, localhost:..../api/routes)
*/

const { Router } = require("express"); //Router es una función que me permite generar el router
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

const { check } = require("express-validator"); //desestructuraré de express-validator
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getUsuarios,
  /*   crearUsuario, */
  actualizarUsuario,
  eliminarUsuario,
} = require("../controllers/users");

// Todas tienen que pasar por la validación del JWT
// Lo puedo hacer poniendo el middleware validarJWT en cada una de ellas así: router.get("/", validarJWT, getUsuarios);
// o bien poniéndolo antes de manera que le estoy diciendo
// que primero pasa por este middleware y después por los get, post, put y delete posteriores

router.use(validarJWT);

// si le cambio la ubicación a este use(validarJWT), p.e., si lo pongo detrás del get, todo el mundo podrá hacer este get
// pero para el resto se tendrá que estar validado;
// la ejecución va por orden: para cada petición http, primero valida con use(validarJWT) y dps atiende el get, post o lo q sea

// Obtener usuarios
router.get("/", getUsuarios); // Le voy a hacer una petición al /

// Crear un nuevo usuario
/* router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(), //el .not().isEmpty() es para que siempre haya información
    check("frequent", "Es obligatorio especificar si el curso es frecuente")
      .not()
      .isEmpty(),
    check("flc", "Es obligatorio especificar si el curso es de la FLC")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearUsuario
); */

//router.use(validarJWT); (si lo pusiera aquí, todo lo q va después exigirá autenticación)

// Actualizar usuario (junto al / podrá haber cualquier cosa; p.e. /23452345234)
router.put(
  "/:id",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(), //el .not().isEmpty() es para que siempre haya información
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
    validarCampos,
  ],
  actualizarUsuario
);

// Borrar usuario
router.delete("/:id", eliminarUsuario);

module.exports = router;
