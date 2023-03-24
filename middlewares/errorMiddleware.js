const errorForDev = (error, res) => {
  console.log("error form dev");
  res.status(error.statusCode).json({
    "Error": {
      "status": error.status,
      "error": error ,
      "massage": error.massage,
      "stack": error.stack,
    },
  });
};
const errorForProd = (error, res) => {
  console.log("error form prod");
  res.status(error.statusCode).json({
    "Error": {
      "status": error.status,
      "error": `${error  }`,
      "massage": error.massage,
    },
  });
};
module.exports.globalErrorMiddleware = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.node_ENV === "development") 
  errorForDev(error, res);
  else errorForProd(error, res);
};
