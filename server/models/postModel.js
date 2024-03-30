const mongoose = require("mongoose");

// schema

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    // image: {
    //   type: string,
    //   required: [true, "Please add an image"],
    // },
    // postedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "user",
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
