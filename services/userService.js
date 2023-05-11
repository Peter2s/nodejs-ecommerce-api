const AsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadImages");
const UserModel = require("../models/userModel");

// upload User image
module.exports.uploadCUserImage = uploadSingleImage("profileImage");
// image processing middle to resize image size
module.exports.resizeImage = AsyncHandler(async ({ body, file }, res, next) => {
  const fileName = `user-${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
  await sharp(file.buffer)
    .resize(1200, 1600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/users/${fileName}`);
  //save the image path into database
  body.image = fileName;
  next();
});

/*
 * @description get List users
 * @route GET /api/v1/users
 * @access private
 *
 */
module.exports.getUsers = factory.getAll(UserModel);
/*
 * @description Get User By ID
 * @route  GET /api/v1/Users/id
 * @access public
 */
module.exports.getUser = factory.getOne(UserModel);
/*
 * @description create new user
 * @route POST /api/v1/categories
 * @access private
 *
 */
module.exports.createUser = factory.createOne(UserModel);
/*
 *  @description update User
 *  @route PATCH /api/v1/Users/id
 *  @access private
 */
module.exports.updateUser = factory.updateOne(UserModel);

/*
 *  @description Delete User
 *  @route DELETE /api/v1/Users/id
 *  @access private
 */
module.exports.deleteUser = factory.deleteOne(UserModel);
