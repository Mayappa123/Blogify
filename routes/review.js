// routes.review.js

const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const reviewController = require("../controllers/review");
const {
  validateReview,
  isLoggedin,
  isReviewAuthor,
} = require("../middleware.js");

router.post(
  "/blogs/:id/reviews",
  isLoggedin,
  validateReview,
  WrapAsync(reviewController.createReview)
);

router.delete(
  "/blogs/:id/reviews/:reviewId",
  isLoggedin,
  isReviewAuthor,
  WrapAsync(reviewController.destroyReview)
);

module.exports = router;

// /blogs/:id/reviews
// /blogs/:id/reviews/:reviewId
