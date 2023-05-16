const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");
const ApiError = require("../utils/ApiError");
const { sendEmail } = require("../utils/sendEmail");
const { createToken } = require("./authSerivce");

const generateRandomNumber = () => {
  const min = 100000; // Minimum 6-digit number
  const max = 999999; // Maximum 6-digit number

  // Generate a random number between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const hashRestCode = (code) =>
  crypto.createHash("sha256").update(code).digest("hex");

module.exports.forgetPassword = asyncHandler(async ({ body }, res, next) => {
  const user = await UserModel.findOne({ email: body.email });
  if (!user)
    next(new ApiError("there are not user found with this email"), 404);
  //generate random  rest password code
  const restCode = generateRandomNumber().toString();
  const hashedRestCode = hashRestCode(restCode);
  //store hashed rest code into DB
  user.passwordRestCode = hashedRestCode;
  // set rest code expiration time 10 minutes
  user.passwordRestCodeExpiration = Date.now() + 10 * (60 * 1000);
  user.passwordRestCodeVerified = false;
  user.save();
  // send email
  const message = `Hi ${user.name}, \n we received your request to change password \n your password reset code is : ${restCode}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "password reset code",
      message,
    });
  } catch (err) {
    // if error in send email rollback database
    user.passwordRestCode = undefined;
    user.passwordRestCodeExpiration = undefined;
    user.passwordRestCodeVerified = undefined;
    user.save();
    return next(new ApiError("there are Error in send email"));
  }
  res
    .status(200)
    .json({ status: "success", message: "rest code send to email" });
});

module.exports.verifyPasswordRestCode = asyncHandler(async (req, res, next) => {
  const { restCode } = req.body;
  const hashedRestCode = hashRestCode(restCode);
  const user = await UserModel.findOne({
    passwordRestCode: hashedRestCode,
    passwordRestCodeExpiration: { $gt: Date.now() },
  });
  if (!user) return next(new ApiError("invalid user password rest code"));
  user.passwordRestCodeVerified = true;
  await user.save();
  res.status(200).json({ status: "success" });
});

module.exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email, newPassword } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) return next(new ApiError("user not found"), 404);

  if (!user.passwordRestCodeVerified)
    return next(new ApiError("reset code not verified"), 400);

  user.password = newPassword;
  user.passwordRestCode = undefined;
  user.passwordRestCodeExpiration = undefined;
  user.passwordRestCodeVerified = undefined;
  await user.save();

  const token = await createToken(user._id);
  res.status(200).json({ token });
});
