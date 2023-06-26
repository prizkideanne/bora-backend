const { blog: blogController } = require("../controllers");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

// router.post("/create", authMiddleware.verifyToken,blogController.create);
router.get("/:id", blogController.getBlog);
// router.get("/all", blogController.getAllBlog)

module.exports = router;
