require("dotenv").config();

/** import routes */
const categoryRoute = require("./categoryRoute");
const subCategoryRoute = require("./subCategoryRoute");
const brandRoute = require("./brandRoute");
const productRoute = require("./productRoute ");
const UserRoute = require("./userRoute");
const AuthRoute = require("./authRoutes");
const ReviewsRoute = require("./reviewRoutes");
const WishlistRoute = require("./wishlistRoutes");
const AddressesRoute = require("./addressRoute");
const CouponRoute = require("./couponRoutes");

const mountRoutes = (app) => {
  const baseURL = process.env.BASE_URL;
  /** Routes  */
  app.use(`${baseURL}/categories`, categoryRoute);
  app.use(`${baseURL}/subCategories`, subCategoryRoute);
  app.use(`${baseURL}/brands`, brandRoute);
  app.use(`${baseURL}/products`, productRoute);
  app.use(`${baseURL}/users`, UserRoute);
  app.use(`${baseURL}/auth`, AuthRoute);
  app.use(`${baseURL}/reviews`, ReviewsRoute);
  app.use(`${baseURL}/wishlist`, WishlistRoute);
  app.use(`${baseURL}/addresses`, AddressesRoute);
  app.use(`${baseURL}/coupons`, CouponRoute);
};
module.exports = mountRoutes;
