const express = require('express');
const router = express.Router();
const Post = require('./post');

router.get('/feed', async (req, res) => {
  try {
    const publicaciones = await Post.find()
      .sort({ createdAt: -1 })
      .populate('usuario', 'nombreDeUsuario');

    res.json(publicaciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
