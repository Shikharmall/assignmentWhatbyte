const jwt = require("jsonwebtoken");

const config = require("../config/config");

const generateToken = (id, expiresIn = "24h") => {
  return jwt.sign({ id }, config.jwtSecret, { expiresIn });
};

module.exports = generateToken;
