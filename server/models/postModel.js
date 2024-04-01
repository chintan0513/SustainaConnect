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
    //   type: String,
    //   required: [true, "Please add an image"],
    // },
    date: {
      type: Date,
      required: [true, "Please add a date for the event"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
