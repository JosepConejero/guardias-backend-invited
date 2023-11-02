/*
    Courses routes / Rutas de Courses
    host + /api/courses
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getCursos,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
} = require("../controllers/courses");

router.use(validarJWT);

router.get("/", getCursos);

router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
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

router.put(
  "/:id",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
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

router.delete("/:id", eliminarCurso);

module.exports = router;
