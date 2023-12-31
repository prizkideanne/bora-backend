const { body, validationResult } = require("express-validator");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = {
  validateResetPass: validate([
    body("token").notEmpty().withMessage("token is required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("minimum password length is 8 characters")
      .isStrongPassword({
        minSymbols: 0,
      })
      .withMessage(
        "password must contain 1 uppercase, 1 lowercase and 1 numbers"
      )
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          return false;
        }
        return true;
      })
      .withMessage("confirm password is not match with password"),
  ]),
  validateRegister: validate([
    body("username")
      .notEmpty()
      .withMessage("username is required")
      .isLength({ max: 50 })
      .withMessage("Maximum character is 50"),
    body("email").isEmail(),
    body("phoneNumber").notEmpty(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("minimum password length is 8 characters")
      .isStrongPassword({
        minSymbols: 0,
      })
      .withMessage(
        "password must contain 1 uppercase, 1 lowercase and 1 numbers"
      )
      .custom((value, { req }) => {
        if (value !== req.body.confirmPassword) {
          return false;
        }
        return true;
      })
      .withMessage("confirm password is not match with password"),
  ]),
};