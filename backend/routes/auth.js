const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { nombre, correo, cedula, password, token } = req.body;

  if (!nombre || !correo || !cedula || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const nuevoUsuario = new User({ nombre, correo, cedula, password, token });
    await nuevoUsuario.save();
    console.log("✅ Usuario guardado:", nuevoUsuario);
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("❌ Error al registrar usuario:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// POST /api/auth/login

router.post("/login", async (req, res) => {
  const { correo, password } = req.body;

  const user = await User.findOne({ correo, password });

  if (!user) {
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  res.json({ nombre: user.nombre, correo: user.correo });
});

module.exports = router;
