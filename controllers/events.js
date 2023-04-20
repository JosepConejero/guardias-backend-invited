const { response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find(); //en el find puedo especificar condiciones con {loquesea}, pero como quiero traerlos todos, no pongo nada dentro de ()
  //.populate("user"); //esto lo haría para poder rellenar todos los datos del usuario
  //"user" será la referencia que quiero usar (por si tengo varias referencias)
  //// .populate("user", "name"); //esto lo hago para  rellenar los datos del usuario que me interesan, en este caso "name"; si quisiera más, lo pondría así: "name password loquesea"
  //me saldrá automáticamente el _id, tb podría hacer q no apareciera pero me interesa para saber el id del usuario
  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  //aquí verificaré que en el body tengo el evento
  // en postman lo puedo probar poniendo algo en el body en formato json
  //console.log(req.body);

  const evento = new Evento(req.body); //ya tengo una nueva instancia de mi modelo
  // console.log(req.body);
  // console.log(evento);
  try {
    //evento.user = req.uid; // con esto se añade el usuario al evento
    // console.log(evento);

    const eventoGuardado = await evento.save();
    res.status(200).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  //primero tomo el valor del id que viene en la url
  const eventoId = req.params.id;
  //const uid = req.uid;

  try {
    //primero compruebo q el evento existe
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }
    //después compruebo q el usuario sea el que ha creado el evento
    /*   if (evento.user.toString() !== uid) {
      //comparo la id del usuario (pero en el primer caso lo tengo q convertir a string)
      // el código de error cuando alguien no está autorizado es 401
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar este evento",
      });
    } */
    //a continuación, si llega a este punto es porque es el autor de este evento
    const nuevoEvento = {
      ...req.body,
      //user: uid, //porque en la petición no viene la petición del usuario
    };
    //ahora lo grabo en la bda
    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );
    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    //este error en teoría no tiene por qué aparecer, pero podría personalizarlo también con la hora, etc.
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }

  /*   res.json({
    ok: true,
    eventoId,
  }); */
  /*   res.json({
    // { /23412341234 (p.e.)
    ok: true,
    msg: "actualizarEvento",
  }); */
};

const eliminarEvento = async (req, res = response) => {
  //primero tomo el valor del id que viene en la url
  const eventoId = req.params.id;
  //const uid = req.uid;

  try {
    //primero compruebo q el evento existe
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por ese id",
      });
    }
    //después compruebo q el usuario sea el que ha creado el evento
    /*  if (evento.user.toString() !== uid) {
      //comparo la id del usuario (pero en el primer caso lo tengo q convertir a string)
      // el código de error cuando alguien no está autorizado es 401
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de eliminar este evento",
      });
    } */

    //a continuación, si llega a este punto es porque es el autor de este evento
    //ahora lo elimino de la bda
    await Evento.findByIdAndDelete(eventoId);
    res.json({
      ok: true,
      eventoIdBorrado: eventoId,
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

module.exports = { getEventos, crearEvento, actualizarEvento, eliminarEvento };
