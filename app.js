const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const {
  notFoundHandler,
  defaultErrorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");

require("dotenv").config();
require("./config/database");
///-------------------///
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cookieParser(process.env.COOKIE_SECRET));
///-------Routes-------///
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);
///-------Error Handler-------///
app.use(notFoundHandler);
app.use(defaultErrorHandler);
///-------------------///
module.exports = app;
