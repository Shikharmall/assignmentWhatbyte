const jwt = require("jsonwebtoken");
const config = require("../config/config");

const verifyToken = (token) => {
  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = verifyToken;
