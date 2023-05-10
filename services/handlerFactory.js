const asyncHandler = require("express-async-handler");
const BrandModel = require("../models/brandModel ");
const ApiError = require("../utils/ApiError");
module.exports.deleteOne = (Model) => {
  return asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findByIdAndDelete(id);
    if (!document)
      return next(new ApiError(` no ${Model} for this id ${id}`, 404));

    res.status(204).json({});
  });
};
