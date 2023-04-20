const moment = require("moment");

// esto es una prueba para ver que se le envía automáticamente a esta función (value: el valor, rest: información q contiene la request, etc.)
/* //const isDate = (value, rest) => {
const isDate = (value, { req, location, path }) => {
  console.log(value);
  console.log(req, location, path);
  //console.log(rest);
};
 */

const isDate = (value) => {
  if (!value) return false;
  const fecha = moment(value);
  if (fecha.isValid()) {
    return true;
  } else {
    return false;
  }
};

module.exports = { isDate };
