const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/', async (req, res) => {
  const { nombre, correo, canton, celular, contraseña } = req.body;

  if (!nombre || !correo || !canton || !celular || !contraseña) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const existente = await User.findOne({ correo });
    if (existente) {
      return res.status(400).json({ mensaje: 'Este correo ya está registrado' });
    }

    const nuevo = new User({ nombre, correo, canton, celular, contraseña });
    await nuevo.save();

    res.status(201).json({ mensaje: 'Usuario guardado correctamente' });
  } catch (err) {
    console.error(' Error al guardar usuario:', err);
    res.status(500).json({ mensaje: 'Error al guardar usuario', error: err.message });
  }
});

module.exports = router;
