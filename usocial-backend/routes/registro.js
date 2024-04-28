const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { getRole } = require('../models/roleManagement');
const { username, email, password, role } = req.body;

try {
  const permisos = getRole(role);

  const nuevoUsuario = new Usuario({
    username,
    email,
    password: hashedPassword,
    role,
    permisos,
  });

  await nuevoUsuario.save();
  req.flash('success', 'Usuario creado');
  res.redirect('/login');
} catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Error interno del servidor' });
}

// ...

async function registrarUsuario(username, email, contraseña) {
  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      throw new Error('Correo electrónico ya en uso');
    }

    const contraseñaHasheada = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new Usuario({
      username,
      email,
      password: contraseñaHasheada,
    });

    await nuevoUsuario.save();

    return nuevoUsuario;
  } catch (error) {
    throw error;
  }
}

router.post(
  '/',
  [
    body('username')
    .notEmpty()
    .withMessage('El nombre de usuario es requerido')
    .isLength({ min: 3, max: 50 })
    .withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres'),
    body('email')
    .notEmpty()
    .withMessage('El correo electrónico es requerido')
    .isEmail()
    .withMessage('Formato de correo electrónico inválido')
    .custom(async (value) => {
        const usuarioExistente = await Usuario.findOne({ email: value });
        if (usuarioExistente) {
          throw new Error('Correo electrónico ya en uso');
        }
        return true;
      }),
    body('password')
    .notEmpty()
    .withMessage('La contraseña es requerida')
    .isLength({ min: 8, max: 1024 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  ],
  async (req, res) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const { username, email, password } = req.body;

    try {
      const nuevoUsuario = await registrarUsuario(username, email, password);
      req.flash('success', 'Usuario creado');
      res.redirect('/login');
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
);

module.exports = router;