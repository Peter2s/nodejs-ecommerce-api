const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

const router = express.Router();
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
} = require("../validators/userValidators");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadCUserImage,
  resizeImage,
} = require("../services/userService");

router
  .route("/")
  .get(getUsers)
  .post(
    uploadCUserImage,
    resizeImage,
    createUserValidator,
    slugifyName,
    createUser
  );

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .patch(
    uploadCUserImage,
    resizeImage,
    updateUserValidator,
    slugifyName,
    updateUser
  )
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
