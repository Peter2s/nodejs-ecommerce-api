const path = require("path");
const express = require("express");
require("dotenv").config();

// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-require
const morgan = require("morgan");

const { globalErrorMiddleware } = require("./middlewares/errorMiddleware");

const mountRoutes = require("./routes");

const DBConnection = require("./config/database");
/* Data Base  */
DBConnection();
/* express App  */
const app = express();

/** body parser*/
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));

/*   logging */
app.use(morgan("dev"));

/* routes */
mountRoutes(app);

/** Route not found  Middleware */
app.all("*", (req, res, next) => {
  res.status(404).json(`can't find this route ${req.originalUrl}`);
});

// error Middleware
app.use(globalErrorMiddleware);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`app listen to  ${PORT}`);
});

/** handle unhandled  Rejection */
process.on("unhandledRejection", (error) => {
  console.error(`unhandled Rejection Error : ${error}  `);
  server.close(() => {
    console.log("server shutting down ... ");
    process.exit(1);
  });
});
