// const getTokenFromCookie = require("../utils/getTokenFromCookie");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");
const User = require("../models/User/userModel");

const isLogin = async (req, res, next) => {
  const token = getTokenFromHeader(req);

  const decodedUser = verifyToken(token);

  if (!decodedUser) {
    return res
      .status(401)
      .json({ error: "Invalid/Expired Token, Please Login Again" });
  }

  const userData = await User.findById({ _id: decodedUser.id });

  if (!userData) {
    return res
      .status(401)
      .json({ error: "User does not exist, Please Login Again" });
  }

  req.user = {
    id: userData._id,
  };

  next();
};

module.exports = isLogin;
