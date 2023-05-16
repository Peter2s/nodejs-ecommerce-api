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
const getLoggedUser = require("../middlewares/getLoggedInUserData");
const { authenticate, authorizedTo } = require("../services/authSerivce");

router.get("/profile", authenticate, getLoggedUser, getUser);
router.use(authenticate, authorizedTo("admin"));
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
  .route("/changePassword/:id")
  .patch(changePasswordValidator, changePassword);

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
