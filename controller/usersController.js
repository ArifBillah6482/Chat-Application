const bcrypt = require("bcrypt");
const People = require("../models/People");
const { unlink } = require("fs");

const getUsers = async (req, res, next) => {
  try {
    const users = await People.find();
    res.render("users", {
      users,
    });
  } catch (err) {
    next(err);
  }
};

///------------///
const addUser = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    let newUser;
    if (req.files && req.files.length > 0) {
      newUser = new People({
        name,
        email,
        mobile,
        password: hashedPassword,
        avatar: req.files[0].filename,
      });
    } else {
      newUser = new People({
        name,
        email,
        mobile,
        password: hashedPassword,
      });
    }

    const result = await newUser.save();
    res.status(201).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
};

///------------///
const removeUser = async (req, res) => {
  try {
    const user = await People.findByIdAndDelete({ _id: req.params.id });

    if (user.avatar) {
      const filePath = `${__dirname}/../public/uploads/avatars/${user.avatar}`;
      unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }

    res.status(200).json({
      message: "User was removed successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Could not delete the user!",
        },
      },
    });
  }
};

///-------------------///
module.exports = { getUsers, addUser, removeUser };
