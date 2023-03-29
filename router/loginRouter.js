const { getLogin, login, logout } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");
const redirectLoggedIn = require("../middlewares/login/redirectLoggedIn");

const loginRouter = require("express").Router();

loginRouter.get("/", decorateHtmlResponse("Login"), redirectLoggedIn, getLogin);
///-------------------///
loginRouter.post(
  "/",
  decorateHtmlResponse("Login"),
  doLoginValidators,
  doLoginValidationHandler,
  login
);

///------------///
loginRouter.delete("/", logout);

///-------------------///
module.exports = loginRouter;
