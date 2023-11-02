/*
    Events routes / Rutas de Events
    host + /api/routes
*/

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

router.use(validarJWT);

router.get("/", getEventos);

router.post(
  "/",
  [
    check("isHoliday", "Es obligatorio indicar si es día de fiesta o no")
      .not()
      .isEmpty(),
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

router.put(
  "/:id",
  [
    check("isHoliday", "Es obligatorio indicar si es día de fiesta o no")
      .not()
      .isEmpty(),
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

router.delete("/:id", eliminarEvento);

module.exports = router;
