// const { profile: profileController } = require("../controllers");
const authMiddleware = require("../middleware/auth");
const router = require("express").Router();
const { profile: profileController } = require("../controllers");

router.get(
  "/",
  authMiddleware.verifyToken,
  profileController.getLoggedInProfile
);

module.exports = router;
