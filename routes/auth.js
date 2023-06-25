const { auth: authController } = require("../controllers");
const router = require("express").Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
