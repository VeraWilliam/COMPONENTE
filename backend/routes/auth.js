const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
  const {
    nombre,
    correo,
    canton,
    celular,
    contrasena,
    cedula,
    sexo,
    fechaNacimiento
  } = req.body;

 
  if (
    !nombre || !correo || !canton || !celular ||
    !contrasena || !cedula || !sexo || !fechaNacimiento
  ) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    
    const existente = await User.findOne({ correo });
    if (existente) {
      return res.status(400).json({ mensaje: 'Este correo ya está registrado' });
    }

    
    const nuevo = new User({
      nombre,
      correo,
      canton,
      celular,
      contrasena,
      cedula,
      sexo,
      fechaNacimiento
    });

    await nuevo.save();
    res.status(201).json({ mensaje: 'Usuario guardado correctamente' });
  } catch (err) {
    console.error(' Error al guardar usuario:', err);
    res.status(500).json({ mensaje: 'Error al guardar usuario', error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
  }

  try {
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado' });
    }

    
    if (usuario.contrasena !== contrasena) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });

    res.json({
      token,
      nombre: usuario.nombre,
      correo: usuario.correo
    });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ mensaje: 'Error al iniciar sesión' });
  }
});

module.exports = router;
