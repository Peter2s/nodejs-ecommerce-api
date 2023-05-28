const AsyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel");

/*
 * @description get authenticated user addresses
 * @route GET /api/v1/addresses
 * @access private
 */
module.exports.getAuthenticatedUserAddresses = AsyncHandler(
  async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).populate("addresses");
    res.status(200).json({
      status: "success",
      result: user.addresses.length,
      data: user.addresses,
    });
  }
);
/*
 * @description add user address
 * @route POST /api/v1/addresses
 * @access private
 */
module.exports.addAddress = AsyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { addresses: req.body },
    },
    { new: true }
  ).populate("addresses");
  res.status(201).json({
    status: "success",
    message: "address added successfully",
    data: user.addresses,
  });
});
/*
 * @description remove user address
 * @route DELETE /api/v1/addresses/:id
 * @access private
 */
module.exports.deleteAddress = AsyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { addresses: { _id: req.body.addressId } },
    },
    { new: true }
  ).populate("addresses");
  res.status(200).json({
    status: "success",
    message: "address removed successfully",
    data: user.addresses,
  });
});
