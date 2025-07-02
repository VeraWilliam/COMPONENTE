const express = require('express');
const jwt = require('jsonwebtoken');
const Respuesta = require('../models/RespuestaEncuesta');

const router = express.Router();

// Middleware para verificar token
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    next();
  });
};

// POST /api/encuesta/responder
router.post('/responder', auth, async (req, res) => {
  const { seguridad, alumbrado, parques, basura } = req.body;

  try {
    const nueva = new Respuesta({
      usuarioId: req.userId,
      seguridad,
      alumbrado,
      parques,
      basura
    });

    await nueva.save();
    res.json({ mensaje: 'Encuesta guardada correctamente' });
  } catch (err) {
    console.error(' Error al guardar encuesta:', err);
    res.status(500).json({ mensaje: 'Error al guardar encuesta', error: err.message });
  }
});

// GET /api/encuesta/resultados
router.get('/resultados', async (req, res) => {
  try {
    const datos = await Respuesta.find().populate('usuarioId', 'nombre correo');
    const resultado = datos.map(d => ({
      nombre: d.usuarioId?.nombre || 'Sin nombre',
      correo: d.usuarioId?.correo || 'Desconocido',
      seguridad: d.seguridad,
      alumbrado: d.alumbrado,
      parques: d.parques,
      basura: d.basura,
      fecha: d.fecha
    }));

    res.json(resultado);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener resultados', error: err.message });
  }
});

module.exports = router;
