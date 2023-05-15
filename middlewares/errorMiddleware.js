const ApiError = require("../utils/ApiError");
const errorForDev = (error, res) => {
  console.log("error form dev");
  res.status(error.statusCode).json({
    Error: {
      status: error.status,
      error: error,
      massage: error.massage,
      stack: error.stack,
    },
  });
};
const handleJWTExpiredError = () =>
  new ApiError("token expired ,please login again ", 403);
const handleJWTInvalidTokenError = () =>
  new ApiError("invalid token, please login again ", 403);
const errorForProd = (error, res) => {
  /* handel JWT errors*/
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();
  if (error.name === "JsonWebTokenError") error = handleJWTInvalidTokenError();

  console.log("error form prod");
  res.status(error.statusCode).json({
    Error: {
      status: error.status,
      error: `${error}`,
      massage: error.massage,
    },
  });
};
module.exports.globalErrorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.node_ENV === "development") errorForDev(error, res);
  else errorForProd(error, res);
};
