const { check, validationResult } = require("express-validator");

///-------validation-------///
const doLoginValidators = [
  check("username")
    .isLength({ min: 1 })
    .withMessage("Mobile number or email is required!")
    .trim(),

  check("password").isLength({ min: 1 }).withMessage("Password is required!"),
];

///-------validation errors handle-------///
const doLoginValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};

///------------///
module.exports = {
  doLoginValidators,
  doLoginValidationHandler,
};
