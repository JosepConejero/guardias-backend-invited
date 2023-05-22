const { response } = require("express");
const Usuario = require("../models/Usuario");

const getUsuarios = async (req, res = response) => {
  const usuarios = await Usuario.find(); //en el find puedo especificar condiciones con {loquesea}, pero como quiero traerlos todos, no pongo nada dentro de ()
  res.json({
    ok: true,
    usuarios,
  });
};

/* const crearCurso = async (req, res = response) => {
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
}; */

const actualizarUsuario = async (req, res = response) => {
  //primero tomo el valor del id que viene en la url
  const usuarioId = req.params.id;

  try {
    //primero compruebo q el usuario existe
    //console.log(usuarioId);
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe por ese id",
      });
    }
    const nuevoUsuario = {
      ...req.body,
    };
    //ahora lo grabo en la bda
    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      usuarioId,
      nuevoUsuario,
      { new: true }
    );
    res.json({
      ok: true,
      usuario: usuarioActualizado,
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

const eliminarUsuario = async (req, res = response) => {
  //primero tomo el valor del id que viene en la url
  const usuarioId = req.params.id;

  try {
    //primero compruebo q el usuario existe
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe por ese id",
      });
    }

    //ahora lo elimino de la bda
    await Usuario.findByIdAndDelete(usuarioId);
    res.json({
      ok: true,
      usuarioIdBorrado: usuarioId,
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

module.exports = {
  getUsuarios /* , crearUsuario */,
  actualizarUsuario,
  eliminarUsuario,
};
