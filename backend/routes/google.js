const express = require("express");
const passport = require("passport");

const router = express.Router();

// Inicia el login con Google
router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

// Callback después de autenticar
router.get("/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const correo = req.user.emails[0].value;
    const nombre = req.user.displayName;
    const token = req.user.token;

    // Redirigir al frontend
    res.redirect(`http://localhost:5173/RegistroGoogle?correo=${encodeURIComponent(correo)}&nombre=${encodeURIComponent(nombre)}&token=${token}`);
  }
);

module.exports = router;
