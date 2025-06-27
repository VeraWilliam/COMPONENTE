const mongoose = require("mongoose");

const respuestaSchema = new mongoose.Schema({
  usuario: { type: String, required: true }, // nombre del usuario
  correo: { type: String, required: true },
  seguridad: Number,
  alumbrado: Number,
  parques: Number,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RespuestaEncuesta", respuestaSchema);
