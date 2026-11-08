export function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
}

export function errorHandler(error, req, res, next) {

  if (res.headersSent) {
    return next(error);
  }

  console.error(error);

  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? "Internal server error" : error.message;

  res.status(statusCode).json({
    success: false,
    message,
    ...(error.details ? { errors: error.details } : {})
  });
}
