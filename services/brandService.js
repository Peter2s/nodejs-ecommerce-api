const AsyncHandler = require("express-async-handler");
const sharp = require("sharp");

const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadImages");
const BrandModel = require("../models/brandModel ");

// upload brand image
module.exports.uploadCBrandImage = uploadSingleImage("image");
// image processing middle to resize image size
module.exports.resizeImage = AsyncHandler(async ({ body, file }, res, next) => {
  const fileName = `brands-${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.jpg`;
  await sharp(file.buffer)
    .resize(800, 800)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/brands/${fileName}`);
  //save the image path into database
  body.image = fileName;
  next();
});

/*
 * @description get List brands
 * @route GET /api/v1/brands
 * @access public
 *
 */
module.exports.getBrands = factory.getAll(BrandModel);
/*
 * @description Get Brand By ID
 * @route  GET /api/v1/brands/id
 * @access public
 */
module.exports.getBrand = factory.getOne(BrandModel);
/*
 * @description create new brand
 * @route POST /api/v1/brands
 * @access private
 *
 */
module.exports.createBrand = factory.createOne(BrandModel);
/*
 *  @description update brand
 *  @route PATCH /api/v1/brands/id
 *  @access private
 */
module.exports.updateBrand = factory.updateOne(BrandModel);

/*
 *  @description Delete Brand
 *  @route DELETE /api/v1/brands/id
 *  @access private
 */
module.exports.deleteBrand = factory.deleteOne(BrandModel);
