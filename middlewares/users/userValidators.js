const { check, validationResult } = require("express-validator");
const People = require("../../models/People");
const createError = require("http-errors");
const { unlink } = require("fs");

///-------User register validators-------///
const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required!")
    .isAlpha("en-US", { ignore: " -." })
    .withMessage("Name must not contain anything other than alphabet!")
    .trim(),

  check("email")
    .isEmail()
    .withMessage("Invalid email address!")
    .trim()
    .custom(async (email) => {
      try {
        const user = await People.findOne({ email });

        if (user) {
          throw createError("Email already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("mobile")
    .isMobilePhone("bn-BD")
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .isLength({ min: 11, max: 11 })
    .withMessage("Mobile number must be a valid Bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = await People.findOne({ mobile: value });

        if (user) {
          throw createError("Mobile number already is use!");
        }
      } catch (err) {
        throw createError(err.message);
      }
    }),

  check("password").isLength({ min: 1 }).withMessage("Password is required!"),
];

///-------validation error handle-------///
const addUserValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();

  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    //remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      const filePath = `${__dirname}/../public/uploads/avatars/${filename}`;

      unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

///-------------------///
module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
