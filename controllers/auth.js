const { response } = require("express");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Ya existe un usuario con ese correo",
      });
    }

    usuario = new Usuario(req.body);

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    usuario.shortName = "";
    usuario.isAdmin = false;
    usuario.isActivated = false;
    usuario.isDataModifier = false;
    usuario.isTechnician = false;
    usuario.canFLC = false;
    usuario.canSeeStatistics = false;
    usuario.isStillWorking = true;

    await usuario.save();

    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token,
      shortName: usuario.shortName,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
      isActivated: usuario.isActivated,
      isDataModifier: usuario.isDataModifier,
      isTechnician: usuario.isTechnician,
      canFLC: usuario.canFLC,
      canSeeStatistics: usuario.canSeeStatistics,
      isStillWorking: usuario.isStillWorking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Este usuario no existe con este email, es un ente incorpóreo e inanimado, vamos, de mentira total",
      });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña no es correcta, aunque de nuevo no es aconsejable dar pistas al usuario pa q no trampee el muy tunante",
      });
    }

    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token: token,
      shortName: usuario.shortName,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
      isActivated: usuario.isActivated,
      isDataModifier: usuario.isDataModifier,
      isTechnician: usuario.isTechnician,
      canFLC: usuario.canFLC,
      canSeeStatistics: usuario.canSeeStatistics,
      isStillWorking: usuario.isStillWorking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;
  const token = await generarJWT(uid, name);
  try {
    const usuario = await Usuario.findOne({ _id: uid });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Este usuario no existe con este id, es un ente incorpóreo e inanimado, vamos, de mentira total",
      });
    }
    res.json({
      ok: true,
      uid,
      name,
      token,
      shortName: usuario.shortName,
      email: usuario.email,
      isAdmin: usuario.isAdmin,
      isActivated: usuario.isActivated,
      isDataModifier: usuario.isDataModifier,
      isTechnician: usuario.isTechnician,
      canFLC: usuario.canFLC,
      canSeeStatistics: usuario.canSeeStatistics,
      isStillWorking: usuario.isStillWorking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

const actualizarPasswordUsuario = async (req, res = response) => {
  const { email, password, newPassword } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Este usuario no existe con este email, es un ente incorpóreo e inanimado, vamos, de mentira total",
      });
    }

    const currentPassword = bcrypt.compareSync(password, usuario.password);

    if (!currentPassword) {
      return res.status(201).json({
        ok: false,
        msg: "La contraseña anterior no es correcta, siempre puede restaurarla o avisar al administrador",
      });
    }

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(newPassword, salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      msg: "La constraseña se ha modificado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

const restaurarPasswordUsuario = async (req, res = response) => {
  const usuarioId = req.params.id;

  try {
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Este usuario no existe con este id.",
      });
    }

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(process.env.PASSWORD, salt);

    await usuario.save();

    res.status(201).json({
      ok: true,
      msg: "La constraseña se ha restaurado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor, hable con el administrador",
    });
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
  actualizarPasswordUsuario,
  restaurarPasswordUsuario,
};
