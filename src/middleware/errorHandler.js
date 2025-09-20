export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
  }
}
export const errorHandler = (err, _req, res, _next) => {
  if (!err.isOperational) {
    console.error('Unexpected error: ', err)
    err = new AppError('Internal error', 500)
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  })
}

export const notFound = (req, _res, next) => {
  const error = new AppError(`${req.originalUrl} not found`, 404)
  next(error)
}

export const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
