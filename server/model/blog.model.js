const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    content: { type: String, require: true },
    tags: {
      type: String,
      require: true,
      enum: [
        "Food",
        "Health",
        "Fitness",
        "Technology",
        "Education",
        "Travel",
        "Finance",
        "Lifestyle",
        "Entertainment",
        "Art",
        "Science",
        "Sports",
        "Business",
        "Fashion",
        "Culture",
        "DIY",
        "Music",
        "Movies",
        "Gaming",
        "Parenting",
        "Environment",
        "Politics",
        "History",
        "Nature",
        "Psychology",
      ],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    comments: [
      {
        commentedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true,
        },
        comment: { type: String, require: true },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
