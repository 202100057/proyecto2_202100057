const { ApplicationError } = require('./errors');

function errorHandler(err, req, res, next) {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
}

module.exports = errorHandler;