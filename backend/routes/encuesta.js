const express = require('express');
const jwt = require('jsonwebtoken');
const Respuesta = require('../models/RespuestaEncuesta');
const User = require('../models/User');
const router = express.Router();


router.post('/responder', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findById(decoded.userId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    // Verifica si ya respondió antes
    const encuestaExistente = await Respuesta.findOne({ correo: usuario.correo });

    if (encuestaExistente) {
      
      await Respuesta.updateOne(
        { correo: usuario.correo },
        {
          ...req.body,
          nombre: usuario.nombre,
          correo: usuario.correo,
          fecha: new Date()
        }
      );
      return res.status(200).json({ mensaje: 'Encuesta actualizada correctamente' });
    }

    
    const nueva = new Respuesta({
      ...req.body,
      nombre: usuario.nombre,
      correo: usuario.correo,
      fecha: new Date()
    });

    await nueva.save();
    res.status(201).json({ mensaje: 'Encuesta guardada correctamente' });

  } catch (err) {
    console.error(' Error al guardar/actualizar encuesta:', err);
    res.status(500).json({ mensaje: 'Error al guardar encuesta' });
  }
});


router.get('/resultados', async (req, res) => {
  try {
    const respuestas = await Respuesta.find().sort({ fecha: -1 });
    res.json(respuestas);
  } catch (err) {
    console.error('❌ Error al obtener resultados:', err);
    res.status(500).json({ mensaje: 'Error al obtener resultados' });
  }
});




router.get('/mia', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await User.findById(decoded.userId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    const respuesta = await Respuesta.findOne({ correo: usuario.correo });
    res.json(respuesta || {});
  } catch (err) {
    console.error(' Error al obtener encuesta del usuario:', err);
    res.status(500).json({ mensaje: 'Error al obtener respuestas' });
  }
});

module.exports = router;