const { response } = require("express");
const { validationResult } = require("express-validator");

const validarCampos = (req, res = response, next) => {
  //manejo de errores
  const errors = validationResult(req); //si hay un error, se crea un objeto con los errores, validationResult devuelve ese objeto
  // console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      //este return es para impedir que se ejecute el otro res.json (el q vendría con lo que se ejecutará en el otro middleware controlador)
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

module.exports = { validarCampos };
