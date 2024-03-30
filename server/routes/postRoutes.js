const express = require("express");
const { createPostController } = require("../controllers/postController");

// router object

const router = express.Router();

// routes
router.post("/create-post", createPostController);

// export
module.exports = router;
