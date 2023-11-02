const { response } = require("express");
const Usuario = require("../models/Usuario");

const getUsuarios = async (req, res = response) => {
  const usuarios = await Usuario.find();
  res.json({
    ok: true,
    usuarios,
  });
};

const actualizarUsuario = async (req, res = response) => {
  const usuarioId = req.params.id;

  try {
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
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const eliminarUsuario = async (req, res = response) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findById(usuarioId);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: "Usuario no existe por ese id",
      });
    }

    await Usuario.findByIdAndDelete(usuarioId);
    res.json({
      ok: true,
      usuarioIdBorrado: usuarioId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getUsuarios,
  actualizarUsuario,
  eliminarUsuario,
};
