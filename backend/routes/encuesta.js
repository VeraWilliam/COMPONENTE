const express = require('express');
const jwt = require('jsonwebtoken');
const Respuesta = require('../models/RespuestaEncuesta');

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    next();
  });
};

// POST: guardar respuestas
router.post('/responder', auth, async (req, res) => {
  try {
    const nueva = new Respuesta({
      usuarioId: req.userId,
      ...req.body
    });

    await nueva.save();
    res.json({ mensaje: 'Encuesta enviada con éxito' });
  } catch (err) {
    console.error('❌ Error al guardar encuesta:', err);
    res.status(500).json({ mensaje: 'Error al guardar encuesta', error: err.message });
  }
});

// GET: ver respuestas
router.get('/resultados', async (req, res) => {
  try {
    const datos = await Respuesta.find().populate('usuarioId', 'nombre correo');
    const resultado = datos.map(d => ({
      nombre: d.usuarioId?.nombre || 'Sin nombre',
      correo: d.usuarioId?.correo || 'Sin correo',
      pregunta1: d.pregunta1,
      pregunta2: d.pregunta2,
      pregunta3: d.pregunta3,
      pregunta4: d.pregunta4,
      pregunta5: d.pregunta5,
      pregunta6: d.pregunta6,
      pregunta7: d.pregunta7,
      pregunta8: d.pregunta8,
      pregunta9: d.pregunta9,
      pregunta10: d.pregunta10,
      pregunta11: d.pregunta11,
      pregunta12: d.pregunta12,
      fecha: d.fecha
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener resultados', error: err.message });
  }
});

module.exports = router;
