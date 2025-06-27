const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true }, // ✅ sin unique
  cedula: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String }
});

module.exports = mongoose.model("User", userSchema);
