const { blog: blogController } = require("../controllers");
const router = require("express").Router();

router.post("/create", blogController.create);
router.get("/:id", blogController.getBlog);
router.get("/all", blogController.getAllBlog)

module.exports = router;
