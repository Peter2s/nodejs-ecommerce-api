const AsyncHandler = require("express-async-handler");
const sharp = require("sharp");
const asyncHandler = require("express-async-handler");
const bcrpet = require("bcrypt");

const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadImages");
const ApiError = require("../utils/ApiError");
const { createToken } = require("../services/authSerivce");
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
module.exports.updateUser = asyncHandler(
  async ({ body, params }, res, next) => {
    const { id } = params;
    const document = await UserModel.findByIdAndUpdate(
      id,
      {
        name: body.name,
        phone: body.phone,
        profileImage: body.profileImage,
      },
      {
        new: true,
      }
    );
    if (!document) return next(new ApiError(` no user for this id ${id}`, 404));

    res.status(200).json({ data: document });
  }
);
/*
 *  @description change password for  User
 *  @route PATCH /api/v1/Users/changePassword/:id
 *  @access private
 */
module.exports.changePassword = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const salt = 12;
  const document = await UserModel.findByIdAndUpdate(id, {
    password: await bcrpet.hash(req.body.password, salt),
    // eslint-disable-next-line new-cap
    passwordChangedAt: Date.now(),
  });
  if (!document) return next(new ApiError(` no user for this id ${id}`, 404));
  res.status(204).json({ data: document });
});

/*
 *  @description Delete User
 *  @route DELETE /api/v1/Users/id
 *  @access private
 */
module.exports.deleteUser = factory.deleteOne(UserModel);

/*  ==== FOR Auth USer ===== */

/*
 *  @description change password for auth user
 *  @route PATCH /api/v1/Users/changeMyPassword
 *  @access private
 */
module.exports.updatePasswordForAuthUser = asyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const salt = 12;
    const document = await UserModel.findByIdAndUpdate(id, {
      password: await bcrpet.hash(req.body.password, salt),
      // eslint-disable-next-line new-cap
      passwordChangedAt: Date.now(),
    });
    if (!document) return next(new ApiError(` no user for this id ${id}`, 404));

    const token = await createToken(document._id);

    res.status(200).json({ data: document, token: token });
  }
);

/*
 *  @description user update his profile
 *  @route PATCH /api/v1/Users/profile
 *  @access private
 */
module.exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  const user = await UserModel.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
    },
    { new: true }
  );

  res.status(200).json({ data: user });
});
/*
 *  @description user deactivate his Account
 *  @route PATCH /api/v1/Users/deactivate
 *  @access private
 */

module.exports.deactivateAccount = asyncHandler(async (req, res, next) => {
  const { id } = req.user;
  await UserModel.findByIdAndUpdate(id, {
    active: false,
  });

  res.status(204).json({ status: "success" });
});
