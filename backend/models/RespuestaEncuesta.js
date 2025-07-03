const mongoose = require('mongoose');

const respuestaSchema = new mongoose.Schema({
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pregunta1: Number,
  pregunta2: Number,
  pregunta3: Number,
  pregunta4: Number,
  pregunta5: Number,
  pregunta6: Number,
  pregunta7: Number,
  pregunta8: Number,
  pregunta9: Number,
  pregunta10: Number,
  pregunta11: Number,
  pregunta12: Number,
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RespuestaEncuesta', respuestaSchema);
