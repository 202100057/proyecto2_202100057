const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

router.post(
  '/login',
  [
    body('codigoUSAC')
      .notEmpty()
      .withMessage('El código USAC es requerido')
      .isLength({ min: 8, max: 8 })
      .withMessage('El código USAC debe tener exactamente 8 dígitos'),
    body('contraseña')
      .notEmpty()
      .withMessage('La contraseña es requerida')
      .isLength({ min: 8, max: 1024 })
      .withMessage('La contraseña debe tener al menos 8 caracteres'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { codigoUSAC, contraseña } = req.body;

    try {
      const usuario = await Usuario.findOne({ codigoUSAC });
      if (!usuario) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      const esContraseñaValida = await bcrypt.compare(contraseña, usuario.password);
      if (!esContraseñaValida) {
        return res.status(401).json({ error: 'Contraseña inválida' });
      }

      // El usuario está autenticado, devuelve un token de acceso
      const accessToken = generateAccessToken(usuario);
      res.json({ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

function generateAccessToken(usuario) {
  // Genera un token de acceso para el usuario autenticado
  // Puedes utilizar una librería como jsonwebtoken para generar el token
  // Aquí solo se muestra un ejemplo de cómo podría ser la función
  return jwt.sign(
    {
      id: usuario._id,
      username: usuario.username,
      role: usuario.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  );
}

module.exports = router;
