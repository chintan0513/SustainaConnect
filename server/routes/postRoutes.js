const express = require("express");
const {
  createPostController,
  getAllPostsContoller,
  deletePostController,
} = require("../controllers/postController");

// router object

const router = express.Router();

// routes
router.post("/create-post", createPostController);

// get posts
router.get("/get-post", getAllPostsContoller);

// delete post
router.delete("/delete-post/:id", deletePostController);

// export
module.exports = router;
