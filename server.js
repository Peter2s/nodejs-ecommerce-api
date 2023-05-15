const path = require("path");

const express = require("express");
require("dotenv").config();

// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-require
const morgan = require("morgan");

const { globalErrorMiddleware } = require("./middlewares/errorMiddleware");
/** import routes */
const categoryRoute = require("./routes/categoryRoute");
const subCategoryRoute = require("./routes/subCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const productRoute = require("./routes/productRoute ");
const UserRoute = require("./routes/userRoute");
const AuthRoute = require("./routes/authRoutes");

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

const baseURL = process.env.BASE_URL;
/** Routes  */
app.use(`${baseURL}/categories`, categoryRoute);
app.use(`${baseURL}/subCategories`, subCategoryRoute);
app.use(`${baseURL}/brands`, brandRoute);
app.use(`${baseURL}/products`, productRoute);
app.use(`${baseURL}/users`, UserRoute);
app.use(`${baseURL}/auth`, AuthRoute);

/** Route not  Middleware */
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
