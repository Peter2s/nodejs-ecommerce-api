const multer = require("multer");
const ApiError = require("../utils/ApiError");

// //multer disk storage configuration
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1];
//     const fileName = `category-${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}.${ext}`;
//     console.log(file);
//     cb(null, fileName);
//   },
// });
//

// multer file filter to allow images files only
const multerFilesFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new ApiError("images only allowed", 400), false);
};
// //multer memory storage configuration
const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilesFilter,
});

// multer upload single image middleware
module.exports.uploadSingleImage = (filedName) => upload.single(filedName);
// multer upload multi images middleware
module.exports.uploadMultiImages = (ArrayOfFields) =>
  upload.fields(ArrayOfFields);
