const postModel = require("../models/postModel");

const createPostController = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).send({
        success: false,
        message: "Please provide title and description",
      });
    }

    const post = await postModel.create({
      title,
      description,
      location,
      // image,
      // postedBy: req.auth._id,
    });
    res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });

    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating post. Please try again.",
      error,
    });
  }
};

module.exports = { createPostController };
