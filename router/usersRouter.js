const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const checkLogin = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const usersRouter = require("express").Router();

usersRouter.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);
///------------///
usersRouter.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);
///------------///
usersRouter.delete("/:id", removeUser);
///-------------------///
module.exports = usersRouter;
