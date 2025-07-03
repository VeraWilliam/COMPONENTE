
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre:           { type: String, required: true },
  correo:           { type: String, required: true, unique: true },
  canton:           { type: String, required: true },
  celular:          { type: String, required: true },
  contrasena:       { type: String, required: true },
  cedula:           { type: String, required: true },
  sexo:             { type: String, enum: ['Masculino', 'Femenino'], required: true },
  fechaNacimiento:  { type: Date, required: true }
});

module.exports = mongoose.model('User', userSchema);
