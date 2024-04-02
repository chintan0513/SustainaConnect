const postModel = require("../models/postModel");
const multer = require("multer");

// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const createPostController = async (req, res) => {
  try {
    // Multer middleware to handle file upload
    upload.single("image")(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        return res.status(400).send({
          success: false,
          message: "Error uploading image.",
          error: err.message,
        });
      } else if (err) {
        // An unknown error occurred when uploading
        return res.status(500).send({
          success: false,
          message: "Unknown error uploading image.",
          error: err.message,
        });
      }

      // Extracting data from the request body
      const { title, description, location, date } = req.body;

      // Checking if all required fields are present
      if (!title || !description || !location || !date || !req.file) {
        return res.status(400).send({
          success: false,
          message:
            "Please provide title, description, location, date, and image.",
        });
      }

      // Creating a new post with the extracted data
      const post = await postModel.create({
        title,
        description,
        location,
        date,
        image: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      });

      // Sending success response
      res.status(201).send({
        success: true,
        message: "Post created successfully",
        post,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating post. Please try again.",
      error,
    });
  }
};

const getAllPostsContoller = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("_id", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Posts Data",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In GETALLPOSTS API",
      error,
    });
  }
};

const deletePostController = async (req, res) => {
  try {
    const { id } = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Your Post been deleted!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in delete post api",
      error,
    });
  }
};

const updatePostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //post find
    const post = await postModel.findById({ _id: req.params.id });
    //validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please Provide post title or description",
      });
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: title || post?.title,
        description: description || post?.description,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Post Updated Successfully",
      updatedPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in update post api",
      error,
    });
  }
};

module.exports = {
  createPostController,
  getAllPostsContoller,
  deletePostController,
  updatePostController,
};
