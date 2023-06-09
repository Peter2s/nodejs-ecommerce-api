const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
// eslint-disable-next-line import/no-extraneous-dependencies
const JWT = require("jsonwebtoken");

require("dotenv").config();

const userModel = require("../models/userModel");
const ApiError = require("../utils/ApiError");

module.exports.createToken = async (payload) =>
  await JWT.sign({ userId: payload }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIR,
  });
/*
 * @description signup as user
 * @route GET /api/v1/auth/signup
 * @access public
 *
 */
module.exports.signup = asyncHandler(async ({ body }, res, next) => {
  const user = await userModel.create({
    name: body.name,
    slug: body.slug,
    email: body.email,
    password: body.password,
    phone: body.phone,
  });
  const token = await this.createToken(user._id);
  res.status(201).json({ data: user, token });
});
/*
 * @description user login
 * @route GET /api/v1/auth/login
 * @access public
 *
 */

module.exports.login = asyncHandler(async ({ body }, res, next) => {
  const user = await userModel.findOne({
    email: body.email,
  });
  if (!user) next(new ApiError("email or password incorrect", 401));
  const match = await bcrypt.compare(body.password, user.password);
  if (!match) next(new ApiError("email or password incorrect", 401));

  const token = await this.createToken(user._id);
  res.status(201).json({ data: user, token });
});

module.exports.authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization.startsWith("Bearer"))
    token = req.headers.authorization.split(" ")[1];
  if (!token) next(new ApiError("unauthenticated", 401));
  //verify token
  const decode = await JWT.verify(token, process.env.JWT_SECRET_KEY);
  //check if user exists
  const user = await userModel.findById(decode.userId);
  if (!user)
    next(new ApiError("the user belong to this user not longer exists"), 401);

  if (!user.active)
    next(
      new ApiError(
        "user inactive please active this user first and try again "
      ),
      403
    );
  // check if user changed password after token created
  if (user.passwordChangedAt) {
    //convert password changed at to timestamp (seconds)
    const passwordChangedAtTimeStamp = parseInt(
      user.passwordChangedAt.getTime() / 1000,
      10
    );

    // user changed password after token created (Error)
    if (passwordChangedAtTimeStamp > decode.iat)
      next(
        new ApiError("this user has changed password, please login again"),
        401
      );
  }
  req.user = user;
  next();
});

module.exports.authorizedTo = (...roles) =>
  asyncHandler((req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(req.user.role))
      next(new ApiError("not authorized"), 403);
    next();
  });
