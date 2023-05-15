const express = require("express");
const slugifyName = require("../middlewares/slugifyMiddleWare");

const router = express.Router();
const {
  getUserValidator,
  createUserValidator,
  updateUserValidator,
  deleteUserValidator,
  changePasswordValidator,
} = require("../validators/userValidators");

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  changePassword,
  deleteUser,
  uploadCUserImage,
  resizeImage,
} = require("../services/userService");
const { authenticate, authorizedTo } = require("../services/authSerivce");

router
  .route("/")
  .get(authenticate, authorizedTo("admin"), getUsers)
  .post(
    authenticate,
    authorizedTo("admin"),
    uploadCUserImage,
    resizeImage,
    createUserValidator,
    slugifyName,
    createUser
  );
router
  .route("/changePassword/:id")
  .patch(changePasswordValidator, changePassword);

router
  .route("/:id")
  .get(authenticate, authorizedTo("admin"), getUserValidator, getUser)
  .patch(
    uploadCUserImage,
    resizeImage,
    updateUserValidator,
    slugifyName,
    updateUser
  )
  .delete(authenticate, authorizedTo("admin"), deleteUserValidator, deleteUser);

module.exports = router;
