class ApiError extends Error {
  constructor(massage, statusCode) {
    super(massage);
    this.statusCode = statusCode;
  }
}
