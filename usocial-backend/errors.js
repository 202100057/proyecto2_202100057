const notFoundError = (req, res, next) => {
    const error = new Error(`No se encuentra la ruta ${req.url}`);
    error.status = 404;
    next(error);
  };
  
  const developmentErrors = (err, req, res, next) => {
    if (err.status) {
      const error = { ...err };
      delete error.status;
      return res.status(err.status).json({ error });
    }
    return res.status(500).json({ error: { message: 'Internal Server Error' } });
  };
  
  const productionErrors = (err, req, res, next) => {
    if (err.status) {
      return res.status(err.status).json({ error: { message: err.message } });
    }
    return res.status(500).json({ error: { message: 'Internal Server Error' } });
  };
  
  module.exports = {
    notFoundError,
    developmentErrors,
    productionErrors,
  };