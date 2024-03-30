const express = require("express");
const {
  createPostController,
  getAllPostsContoller,
} = require("../controllers/postController");

// router object

const router = express.Router();

// routes
router.post("/create-post", createPostController);

// get posts
router.get("/get-post", getAllPostsContoller);

// export
module.exports = router;
