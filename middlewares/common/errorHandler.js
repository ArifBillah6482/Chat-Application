const createError = require("http-errors");
function notFoundHandler(req, res, next) {
  res.locals.title = "Error Page";
  res.render("error", {
    errorText: "Page not found!",
  });
}
//
function errorHandler(err, req, res, next) {
  res.locals.error = err.message;
  if (res.locals.html) {
    res.render("error", {
      errorText: "Your requested content was not found!",
    });
  } else {
    res.json(res.locals.error);
  }
}
module.exports = {
  notFoundHandler,
  errorHandler,
};
