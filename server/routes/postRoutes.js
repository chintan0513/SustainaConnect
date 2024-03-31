const express = require("express");
const {
  createPostController,
  getAllPostsContoller,
  deletePostController,
  updatePostController,
} = require("../controllers/postController");

// router object

const router = express.Router();

// routes
router.post("/create-post", createPostController);

// get posts
router.get("/get-post", getAllPostsContoller);

// delete post
router.delete("/delete-post/:id", deletePostController);

//UPDATE POST
router.put("/update-post/:id", updatePostController);

// export
module.exports = router;
