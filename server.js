const express = require("express");
require("dotenv").config();
const morgan = require("morgan");

const ApiError = require("./utils/ApiError");
const {globalErrorMiddleware} = require("./middlewares/errorMiddleware");
const categoryRoute = require("./routes/categoryRoute");

const DBConnection = require("./config/database");
/* Data Base  */
DBConnection();
/* express App  */
const app = express();

/** body parser*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*   logging */
app.use(morgan("dev"));


/** Routes  */
app.use(categoryRoute);

/** Route not  Middleware */
app.all((req, res, next) => {
	next(ApiError(`can't find this route ${req.originalUrl}`,404));
});

// error Middleware
app.use(globalErrorMiddleware);



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app listen to ${PORT}`);
});
