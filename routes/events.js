/*
    Events routes / Rutas de Events
    host + /api/routes (es decir, localhost:..../api/routes)
*/

const { Router } = require("express"); //Router es una función que me permite generar el router
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

const { check } = require("express-validator"); //desestructuraré de express-validator
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

// Todas tienen que pasar por la validación del JWT
// Lo puedo hacer poniendo el middleware validarJWT en cada una de ellas así: router.get("/", validarJWT, getEventos);
// o bien poniéndolo antes de manera que le estoy diciendo
// que primero pasa por este middleware y después por los get, post, put y delete posteriores
router.use(validarJWT);
// si le cambio la ubicación a este use(validarJWT), p.e., si lo pongo detrás del get, todo el mundo podrá hacer este get
// pero para el resto se tendrá que estar validado;
// la ejecución va por orden: para cada petición http, primero valida con use(validarJWT) y dps atiende el get, post o lo q sea

// Obtener eventos
router.get("/", getEventos); // Le voy a hacer una petición al /

// Crear un nuevo evento
router.post(
  "/",
  [
    check("calendarDate", "La fecha es obligatoria").custom(isDate),
    check("isHoliday", "Es obligatorio indicar si es día de fiesta o no")
      .not()
      .isEmpty(), //el .not().isEmpty() es para que siempre haya información
    check(
      "isThereOffice2h",
      "Es obligatorio indicar si hay formaciones de 2 horas o no"
    )
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearEvento
);

//router.use(validarJWT); (si lo pusiera aquí, todo lo q va después exigirá autenticación)

// Actualizar evento (junto al / podrá haber cualquier cosa; p.e. /23452345234)
router.put(
  "/:id",
  [
    check("calendarDate", "La fecha es obligatoria").custom(isDate),
    check("isHoliday", "Es obligatorio indicar si es día de fiesta o no")
      .not()
      .isEmpty(), //el .not().isEmpty() es para que siempre haya información
    check(
      "isThereOffice2h",
      "Es obligatorio indicar si hay formaciones de 2 horas o no"
    )
      .not()
      .isEmpty(),
    validarCampos,
  ],
  actualizarEvento
);

// Borrar evento
router.delete("/:id", eliminarEvento);

module.exports = router;
