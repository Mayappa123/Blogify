// controllers/blogs.js

const Blog = require("../models/blog");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  const Allblogs = await Blog.find({});
  res.render("blogs/index.ejs", { Allblogs });
};

module.exports.renderNewForm = (req, res) => {
  res.render("blogs/new.ejs");
};

module.exports.showBlog = async (req, res) => {
  let { id } = req.params;
  // const blog = await Blog.findById(id)
  //   .populate("owner")
  //   .populate("reviews")
  //   .populate("username");
  const blog = await Blog.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!blog) {
    req.flash("error", "blog does'nt exist...");
    res.redirect("/blogs");
  }
  res.render("blogs/show.ejs", { blog });
};

module.exports.createBlog = async (req, res) => {
  const newBlog = new Blog(req.body.blog);
  newBlog.owner = req.user._id;
  await newBlog.save();
  console.log(newBlog);
  req.flash("success", "New blog created...");
  res.redirect("/blogs");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) {
    req.flash("error", "Blog does'nt exists...");
    res.redirect("/blogs");
  }
  res.render("blogs/edit.ejs", { blog });
};

module.exports.updateBlog = async (req, res) => {
  console.log(req.body);
  let { id } = req.params;
  try {
    let blog = await Blog.findByIdAndUpdate(id, { ...req.body.blog });
    await blog.save();
    req.flash("success", "Blog updated successfully.");
    res.redirect(`/blogs/${id}`);
  } catch (error) {
    console.error("Error updating blog:", error);
    req.flash("error", "Failed to update blog.");
    res.redirect(`/blogs/${id}`);
  }
};

module.exports.destroyBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    req.flash("success", "blog deleted successfully...");
    res.redirect("/blogs");
  } catch (error) {
    console.log(error);
  }
};

module.exports.myBlogs = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      req.flash("error", "Invalid user ID.");
      return res.redirect("/blogs");
    }
    const myBlogs = await Blog.find({ owner: userId });
    if (!myBlogs) {
      req.flash("You haven't posted any blog...");
    }
    res.render("blogs/myblogs.ejs", { myBlogs });
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    req.flash("error", "Failed to fetch user blogs.");
    res.redirect("/blogs");
  }
};

module.exports.searchBlogs = async (req, res) => {
  try {
    const subject = req.query.subject;
    const myBlogs = await Blog.find({
      subject: subject,
    });
    console.log(myBlogs);

    if (myBlogs.length > 0) {
      console.log(data);
      res.render(`blogs/myBlogs.ejs`, { myBlogs });
    } else {
      req.flash("error", `Blogs related to "${subject}" not found...`);
      res.redirect("/blogs");
    }
  } catch (error) {
    console.error("Error searching blogs:", error.message);
    req.flash("error", "An error occurred while searching blogs...");
    res.redirect("/blogs");
  }
};
