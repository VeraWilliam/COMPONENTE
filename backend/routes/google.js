const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  session: false,
  failureRedirect: 'http://localhost:5173/'
}), (req, res) => {
  const { nombre, correo } = req.user;
  const query = `?nombre=${encodeURIComponent(nombre)}&correo=${encodeURIComponent(correo)}`;
  res.redirect(`http://localhost:5173/RegistroGoogle${query}`);
});

module.exports = router;
