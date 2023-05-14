const asyncHandler = require("express-async-handler");

// eslint-disable-next-line import/no-extraneous-dependencies
const JWT = require("jsonwebtoken");

require("dotenv").config();

const userModel = require("../models/userModel");
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
  console.log(process.env.JWT_SECRET_KEY);
  const token = await JWT.sign(
    { userId: user._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIR,
    }
  );
  res.status(201).json({ data: user, token });
});
