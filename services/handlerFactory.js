const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const productModel = require("../models/productModel");
const BrandModel = require("../models/brandModel ");
/*
 create one handler for endpoint
  @param {Model} model
*/

module.exports.createOne = (Model) => {
  return asyncHandler(async ({ body }, res, next) => {
    const document = await Model.create(body);
    if (!document) return next(new ApiError(` bas request`, 400));

    res.status(201).json({ data: document });
  });
};

/*
 update one handler for api endpoint
 @param {Model} model
*/

module.exports.updateOne = (Model) => {
  return asyncHandler(async ({ body, params }, res, next) => {
    const { id } = params;
    const document = await Model.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!document)
      return next(new ApiError(` no ${Model} for this id ${id}`, 404));

    res.status(200).json({ data: document });
  });
};

/*
 Delete one handler for api endpoint
  @param {Model} model
*/
module.exports.deleteOne = (Model) => {
  return asyncHandler(async ({ params }, res, next) => {
    const { id } = params;
    const document = await Model.findByIdAndDelete(id);
    if (!document)
      return next(new ApiError(` no ${Model} for this id ${id}`, 404));

    res.status(204).json({});
  });
};
