const createError = require("http-errors");

///-------404 not found-------///
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your requested content was not found!"));
};

///-------default errors-------///
const defaultErrorHandler = (err, req, res, next) => {
  res.locals.error = { message: err.message, status: err.status || 500 };

  if (!res.locals.html) {
    res.render("error", {
      title: "Error page",
    });
  } else {
    res.json(res.locals.error);
  }
};

///-------------------///
module.exports = {
  notFoundHandler,
  defaultErrorHandler,
};
