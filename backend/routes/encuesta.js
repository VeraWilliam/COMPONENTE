const express = require("express");
const router = express.Router();
const RespuestaEncuesta = require("../models/RespuestaEncuesta");

// Ruta para enviar una nueva encuesta (por si acaso)
router.post("/", async (req, res) => {
  const { usuario, correo, seguridad, alumbrado, parques } = req.body;
  if (!usuario || !correo) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  try {
    const nueva = new RespuestaEncuesta({ usuario, correo, seguridad, alumbrado, parques });
    await nueva.save();
    res.status(201).json({ message: "Encuesta guardada correctamente" });
  } catch (err) {
    console.error("❌ Error al guardar encuesta:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// ✅ Ruta que estás usando en Resultados.jsx
router.get("/resultados", async (req, res) => {
  try {
    const datos = await RespuestaEncuesta.find();
    res.json(datos);
  } catch (err) {
    console.error("❌ Error al obtener resultados:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
