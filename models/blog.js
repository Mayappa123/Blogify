// models/blog.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const blogSchema = new mongoose.Schema({
  // blogImage: {
  //   type: String,
  //   set: (v) =>
  //     v === ""
  //       ? "https://unsplash.com/photos/laptop-computer-on-glass-top-table-hpjSkU2UYSU"
  //       : v,
  // },
  date: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.post("findOneAndDelete", async (blog) => {
  if (blog) {
    await Review.deleteMany({ _id: { $in: blog.reviews } });
  }
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
