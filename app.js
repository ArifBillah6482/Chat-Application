const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
//
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
//
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
//
const app = express();
dotenv.config();
//
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection Successful."))
  .catch((err) => console.log(err));
//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//
app.set("view engine", "ejs");
//
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
//
//all Router
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);
// app.use("/inbox", inboxRouter);
//404 not found handler
app.use(notFoundHandler);
//common error handler
app.use(errorHandler);
//
app.listen(process.env.PORT, () => {
  console.log(`Server listening to port ${process.env.PORT}`);
});
