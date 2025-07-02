const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, unique: true },
  canton: String,
  celular: String,
  contraseña: String
});

module.exports = mongoose.model('User', userSchema);
