class AppError extends Error {
  constructor(message, statusCode, name = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.name = name || this.name || null;
  }
}

module.exports = AppError;
