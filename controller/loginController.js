const People = require("../models/People");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const getLogin = (req, res, next) => {
  res.render("index");
};

///-------Login-------///
const login = async (req, res) => {
  try {
    const user = await People.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        //User Object
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        //generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: "3d",
        });

        //set cookie
        res.cookie("chat_app_token", token, {
          maxAge: 8640000 * 3,
          httpOnly: true,
          signed: true,
        });

        //response
        res.locals.loggedInUser = userObject;
        res.render("inbox");
      } else {
        throw createError("Incorrect password!");
      }
    } else {
      throw createError("User not found!");
    }
  } catch (err) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: err.message,
        },
      },
    });
  }
};

///-------Logout-------///
const logout = (req, res) => {
  res.clearCookie("chat_app_token");
  res.send("logged out!");
};

///-------------------///
module.exports = { getLogin, login, logout };
