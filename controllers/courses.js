const { response } = require("express");
const Curso = require("../models/Curso");

const getCursos = async (req, res = response) => {
  const cursos = await Curso.find(); //en el find puedo especificar condiciones con {loquesea}, pero como quiero traerlos todos, no pongo nada dentro de ()
  res.json({
    ok: true,
    cursos,
  });
};

const crearCurso = async (req, res = response) => {
  //aquí verificaré que en el body tengo el curso
  // en postman lo puedo probar poniendo algo en el body en formato json
  //console.log(req.body);

  const curso = new Curso(req.body); //ya tengo una nueva instancia de mi modelo

  try {
    const cursoGuardado = await curso.save();
    res.status(200).json({
      ok: true,
      curso: cursoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarCurso = async (req, res = response) => {
  //primero tomo el valor del id que viene en la url
  const cursoId = req.params.id;

  try {
    //primero compruebo q el curso existe
    const curso = await Curso.findById(cursoId);

    if (!curso) {
      return res.status(404).json({
        ok: false,
        msg: "Curso no existe por ese id",
      });
    }
    const nuevoCurso = {
      ...req.body,
    };
    //ahora lo grabo en la bda
    const cursoActualizado = await Curso.findByIdAndUpdate(
      cursoId,
      nuevoCurso,
      { new: true }
    );
    res.json({
      ok: true,
      curso: cursoActualizado,
    });
  } catch (error) {
    //este error en teoría no tiene por qué aparecer, pero podría personalizarlo también con la hora, etc.
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarCurso = async (req, res = response) => {
  //primero tomo el valor del id que viene en la url
  const cursoId = req.params.id;

  try {
    //primero compruebo q el curso existe
    const curso = await Curso.findById(cursoId);

    if (!curso) {
      return res.status(404).json({
        ok: false,
        msg: "Curso no existe por ese id",
      });
    }

    //ahora lo elimino de la bda
    await Curso.findByIdAndDelete(cursoId);
    res.json({
      ok: true,
      cursoIdBorrado: cursoId,
    });
  } catch (error) {
    //este error en teoría no tiene por qué aparecer, pero podría personalizarlo también con la hora, etc.
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { getCursos, crearCurso, actualizarCurso, eliminarCurso };
