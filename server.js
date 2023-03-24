const express = require("express");
require("dotenv").config();
const morgan = require("morgan");


const categoryRoute = require("./routes/categoryRoute");

const DBConnection = require("./config/dataBase");
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

// not found Middleware
app.use((req, res, next) => {
	const error = new Error();
	error.message = `can't find this route ${req.originalUrl}`;
	error.status = 404;
	next(error);
});

// error Middleware
app.use((error, req, res, next) => {
  let status = error.status || 500;
  res.status(status).json({ Error: error + "" });
});



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`app listen to ${PORT}`);
});
