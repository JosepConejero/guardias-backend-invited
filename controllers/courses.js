const { response } = require("express");
const Curso = require("../models/Curso");

const getCursos = async (req, res = response) => {
  const cursos = await Curso.find();
  res.json({
    ok: true,
    cursos,
  });
};

const crearCurso = async (req, res = response) => {
  const curso = new Curso(req.body);

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
  const cursoId = req.params.id;

  try {
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
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarCurso = async (req, res = response) => {
  const cursoId = req.params.id;

  try {
    const curso = await Curso.findById(cursoId);

    if (!curso) {
      return res.status(404).json({
        ok: false,
        msg: "Curso no existe por ese id",
      });
    }

    await Curso.findByIdAndDelete(cursoId);
    res.json({
      ok: true,
      cursoIdBorrado: cursoId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = { getCursos, crearCurso, actualizarCurso, eliminarCurso };
