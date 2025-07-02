const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


router.post('/login', async (req, res) => {
  const { correo, contraseña } = req.body;

  if (!correo || !contraseña) {
    return res.status(400).json({ mensaje: 'Campos incompletos' });
  }

  try {
    const user = await User.findOne({ correo });

    if (!user) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Comparación directa (sin hash)
    if (user.contraseña !== contraseña) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Generar token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token });
  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

module.exports = router;
