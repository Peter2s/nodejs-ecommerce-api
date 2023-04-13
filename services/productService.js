const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const productModel = require("../models/productModel");
const ApiError = require("../utils/ApiError");

/*
 * @description get List products
 * @route GET /api/v1/products
 * @access public
 */
module.exports.getProducts = asyncHandler(async (req, res, next) => {
  /**  filtering  */
  const notAllowedKeys = ["page", "limit", "sort", "fields", "keyword"];
  let queryString = { ...req.query };
  notAllowedKeys.forEach((key) => {
    delete queryString[key];
  });
  queryString = JSON.stringify(queryString).replace(
    /\b(gt|gte|lt|lte)\b/g,
    (match) => `$${match}`
  );
  queryString = JSON.parse(queryString);

  /** pagination  */
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  let mongooseQuery = productModel
    .find(queryString)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name" });

  /** fields */
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    console.log(fields);
    mongooseQuery = mongooseQuery.select(fields.toString());
  } else mongooseQuery = mongooseQuery.select("-__v");

  /** sorting  */
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    mongooseQuery = mongooseQuery.sort(sortBy);
  } else mongooseQuery = mongooseQuery.sort("-createdAt");

  /* search  in name and description */
  if (req.query.keyword) {
    const query = {};
    query.$or = [
      { name: { $regex: req.query.keyword, $options: "i" } },
      { description: { $regex: req.query.keyword, $options: "i" } },
    ];
    console.log(query);
    mongooseQuery.find(query);
  }

  /** execute query  */
  const products = await mongooseQuery;
  res.status(201).json({ page, limit, data: products });
});

/*
 * @description Get product By ID
 * @route  GET /api/v1/products/id
 * @access public
 */
module.exports.getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel
    .findById(id)
    .populate({ path: "category", select: "name" });

  if (!product) return next(new ApiError(` no product for this id ${id}`, 404));

  res.status(200).json({ data: product });
});
/*
 * @description create new product
 * @route POST /api/v1/products
 * @access private
 *
 */
module.exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  const product = await productModel.create(req.body);
  if (!product) return next(new ApiError(` bas request`, 400));

  res.status(201).json({ data: product });
});
/*
 *  @description update product
 *  @route PATCH /api/v1/products/id
 *  @access private
 */
module.exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.name) req.body.slug = slugify(req.body.name);

  const product = await productModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) return next(new ApiError(` no product for this id ${id}`, 404));

  res.status(200).json({ data: product });
});

/*
 *  @description Delete products
 *  @route DELETE /api/v1/products/id
 *  @access private
 */
module.exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.findByIdAndDelete(id);
  if (!product) return next(new ApiError(` no product for this id ${id}`, 404));

  res.status(204).json({});
});
