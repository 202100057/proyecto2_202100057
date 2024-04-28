const mongoose = require('mongoose');
const { getRole } = require('../models/roleManagement');

const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'invitado'],
    default: 'invitado',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Agrega una propiedad virtual para obtener los permisos del usuario
UsuarioSchema.virtual('permisos').get(function () {
  return getRole(this.role);
});

// Crea el modelo de usuario
const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Exporta el modelo de usuario
module.exports = Usuario;