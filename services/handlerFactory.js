const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");
const ApiFeatures = require("../utils/ApiFeatures");

module.exports.getAll = (Model) =>
  asyncHandler(async ({ query, params }, res, next) => {
    //for => get sub categories by category id
    let filter = {};
    if (params.categoryId) filter = { category: params.categoryId };

    /** BUILD query*/
    const documentsCount = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(query, Model.find(filter));
    apiFeatures.paginate(documentsCount).filter().sort().limitFields().search();

    const { mongooseQuery, paginationResult } = apiFeatures;
    /** execute query  */
    const documents = await mongooseQuery;
    res
      .status(200)
      .json({ result: documents.length, paginationResult, data: documents });
  });
/*
 get one document handler for endpoint
  @param {Model} model
  @return {response} response {document<model>}
*/
module.exports.getOne = (Model) =>
  asyncHandler(async ({ params }, res, next) => {
    const { id } = params;
    const document = await Model.findById(id);
    if (!document)
      return next(new ApiError(` no brand for this id ${id}`, 404));

    res.status(200).json({ data: document });
  });
/*
 create one handler for endpoint
 @param {Model} model
 @return {response} response {document<model>}
*/

module.exports.createOne = (Model) =>
  asyncHandler(async ({ body }, res, next) => {
    const document = await Model.create(body);
    if (!document) return next(new ApiError(` bas request`, 400));

    res.status(201).json({ data: document });
  });

/*
 update one handler for api endpoint
 @param {Model} model
 @return {response} response {document<model>}
*/

module.exports.updateOne = (Model) =>
  asyncHandler(async ({ body, params }, res, next) => {
    const { id } = params;
    const document = await Model.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!document)
      return next(new ApiError(` no ${Model} for this id ${id}`, 404));

    res.status(200).json({ data: document });
  });

/*
 Delete one handler for api endpoint
  @param {Model} model
*/
module.exports.deleteOne = (Model) =>
  asyncHandler(async ({ params }, res, next) => {
    const { id } = params;
    const document = await Model.findByIdAndDelete(id);
    if (!document)
      return next(new ApiError(` no ${Model} for this id ${id}`, 404));

    res.status(204).json({});
  });
