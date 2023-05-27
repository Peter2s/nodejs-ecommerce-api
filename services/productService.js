const sharp = require("sharp");
const factory = require("./handlerFactory");
const productModel = require("../models/productModel");
const { uploadMultiImages } = require("../middlewares/uploadImages");

//upload product images
module.exports.uploadProductImages = uploadMultiImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 10,
  },
]);
// resize product images before stored
module.exports.resizeImages = async ({ body, files }, res, next) => {
  // resize image cover
  if (files.imageCover) {
    const fileName = `product-${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}-cover.jpg`;
    await sharp(files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/products/${fileName}`);
    // store image file path in DB
    body.imageCover = fileName;
  }

  // resize images
  if (files.images) {
    await Promise.all(
      files.images.map(async (img, i) => {
        body.images = [];
        // create img name
        const fileName = `product-${Date.now()}-${Math.round(
          Math.random() * 1e9
        )}-${i + 1}.jpg`;
        // resize image
        await sharp(img.buffer)
          .resize(800, 800)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`uploads/products/${fileName}`);
        body.images.push(fileName);
      })
    );
  }
  next();
};

/*
 * @description get List products
 * @route GET /api/v1/products
 * @access public
 */
module.exports.getProducts = factory.getAll(productModel);

/*
 * @description Get product By ID
 * @route  GET /api/v1/products/id
 * @access public
 */
module.exports.getProduct = factory.getOne(productModel, "reviews");
/*
 * @description create new product
 * @route POST /api/v1/products
 * @access private
 *
 */
module.exports.createProduct = factory.createOne(productModel);
/*
 *  @description update product
 *  @route PATCH /api/v1/products/id
 *  @access private
 */

module.exports.updateProduct = factory.updateOne(productModel);

/*
 *  @description Delete products
 *  @route DELETE /api/v1/products/id
 *  @access private
 */
module.exports.deleteProduct = factory.deleteOne(productModel);
