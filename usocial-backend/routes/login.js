const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { validationResult } = require('express-validator');

router.post('/login', async (req, res) => {
  const codigoUSAC = req.body.codigoUSAC;
  const contraseña = req.body.contraseña;

  const usuario = await Usuario.findOne({ codigoUSAC });
  if (!usuario) {
    return res.status(401).json({ error: 'Usuario no encontrado' });
  }

  const esContraseñaValida = await bcrypt.compare(contraseña, usuario.password);
  if (!esContraseñaValida) {
    return res.status(401).json({ error: 'Contraseña inválida' });
  }

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('registro', { errores: errores.array() });
  }

  // El usuario está autenticado, redirige a su perfil o feed público
  res.redirect('/perfil');
});

module.exports = router;