
const { body } = require("express-validator");

const validateForm = [
    body("name")
      .isLength({ min: 5 })
      .withMessage("Username must be at least 5 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/)
      .withMessage(
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character"
      ),
  ];

module.exports = validateForm;
