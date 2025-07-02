const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  seguridad: Number,
  alumbrado: Number,
  parques: Number,
  basura: Number,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RespuestaEncuesta', respuestaSchema);
