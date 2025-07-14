const User = require("../../models/User/userModel");
const { validationResult } = require("express-validator");
const generateToken = require("../../utils/generateToken");
const bcrypt = require("bcrypt");

//bcrypting the password

const securePasswordGenerate = async (password) => {
  try {
    const passwordhash = bcrypt.hash(password, 10);
    return passwordhash;
  } catch (error) {
    console.log(error.message);
  }
};

//registering the user

const registerUser = async (req, res) => {
  try {
    const { name, email, password, rePassword } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: "failed", errors: errors.array() });
    }

    // Find email if exist
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res
        .status(409)
        .json({ status: "failed", message: "Email Already Exist" });
    }

    // check password match
    if (password !== rePassword) {
      return res
        .status(422)
        .json({ status: "failed", message: "Password Not Matched" });
    }

    // generate secure password by bycrpting it
    const spassword = await securePasswordGenerate(password);

    const userData = new User({
      name: name,
      email: email,
      password: spassword,
    });

    const userDataSaved = await userData.save();

    if (userDataSaved) {
      return res.status(201).json({ status: "success", data: userDataSaved });
    }
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//logging the user to game dashboard

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const userData = await User.findOne({ email });

    if (!userData) {
      return res
        .status(404)
        .json({ status: "failed", message: "Email Not Exist" });
    }

    const matchPassword = await bcrypt.compare(password, userData.password);

    if (!matchPassword) {
      return res
        .status(404)
        .json({ status: "failed", message: "Password Not Matched" });
    }

    const tokenAge = 259200; // 3 days = 259200 seconds
    const token = generateToken(userData._id, tokenAge);

    return res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        //maxAge: tokenAge * 1000, // 3 days
      })
      .json({
        status: "success",
        data: { userId: userData._id, token: token },
      });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

//get user details

const getUserDetails = async (req, res) => {
  try {
    const { userId } = req.query;

    // Find the user by email
    const userData = await User.findById({ _id: userId });

    if (!userData) {
      return res
        .status(404)
        .json({ status: "failed", message: "User Not Exit" });
    }

    return res.status(200).json({ status: "success", data: userData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

const getAllUserDetails = async (req, res) => {
  try {
    // Find the user by email
    const userData = await User.find().sort({ score: "desc" });

    return res.status(200).json({ status: "success", data: userData });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};

// Logout
const logout = async (req, res) => {
  return res.clearCookie("access_token").status(200).json({
    status: "success",
    msg: "Successfully logged out.",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  getAllUserDetails,
  logout,
};
