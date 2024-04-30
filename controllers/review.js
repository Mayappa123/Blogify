// controllers/review.js

const Blog = require("../models/blog");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
  let blog = await Blog.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  blog.reviews.push(newReview);
  await newReview.save();
  await blog.save();
  req.flash("success", "New Review Created");
  res.redirect(`/blogs/${blog._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Blog.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findOneAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/blogs/${id}`);
};
