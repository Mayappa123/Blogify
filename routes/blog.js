//routes/blog.js

const express = require("express");
const router = express.Router();
const { isLoggedin, isOwner } = require("../middleware");
const WrapAsync = require("../utils/WrapAsync");
const blogController = require("../controllers/blogs");

// Index route
router.get("/blogs", isLoggedin, WrapAsync(blogController.index));

// //new route
router.get("/blogs/new", isLoggedin, WrapAsync(blogController.renderNewForm));

//My Blogs route
router.get(
  "/blogs/myBlogs/:userId",
  isLoggedin,
  WrapAsync(blogController.myBlogs)
);

router
  .route("/blogs/:id")
  .get(isLoggedin, WrapAsync(blogController.showBlog))
  .put(isLoggedin, isOwner, WrapAsync(blogController.updateBlog))
  .delete(isLoggedin, isOwner, WrapAsync(blogController.destroyBlog));

// //Create route
router.post("/blogs", isLoggedin, WrapAsync(blogController.createBlog));

//edit route
router.get(
  "/blogs/:id/edit",
  isLoggedin,
  isOwner,
  WrapAsync(blogController.renderEditForm)
);

//Blog search route
router.get(
  "/blogs/search:subject",
  isLoggedin,
  WrapAsync(blogController.searchBlogs)
);

module.exports = router;
