/*
    Courses routes / Rutas de Courses
    host + /api/courses (es decir, localhost:..../api/routes)
*/

const { Router } = require("express"); //Router es una función que me permite generar el router
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

const { check } = require("express-validator"); //desestructuraré de express-validator
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getCursos,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
} = require("../controllers/courses");

// Todas tienen que pasar por la validación del JWT
// Lo puedo hacer poniendo el middleware validarJWT en cada una de ellas así: router.get("/", validarJWT, getCursos);
// o bien poniéndolo antes de manera que le estoy diciendo
// que primero pasa por este middleware y después por los get, post, put y delete posteriores

router.use(validarJWT);

// si le cambio la ubicación a este use(validarJWT), p.e., si lo pongo detrás del get, todo el mundo podrá hacer este get
// pero para el resto se tendrá que estar validado;
// la ejecución va por orden: para cada petición http, primero valida con use(validarJWT) y dps atiende el get, post o lo q sea

// Obtener cursos
router.get("/", getCursos); // Le voy a hacer una petición al /

// Crear un nuevo curso
router.post(
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
  crearCurso
);

//router.use(validarJWT); (si lo pusiera aquí, todo lo q va después exigirá autenticación)

// Actualizar curso (junto al / podrá haber cualquier cosa; p.e. /23452345234)
router.put(
  "/:id",
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
  actualizarCurso
);

// Borrar curso
router.delete("/:id", eliminarCurso);

module.exports = router;
