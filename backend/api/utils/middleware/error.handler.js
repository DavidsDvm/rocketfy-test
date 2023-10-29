const boom = require('@hapi/boom');

const i18n = require('../../../config/i18n.config');

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    output.payload.message = i18n.__(output.payload.message)
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { errorHandler, boomErrorHandler }
