//Users related routes...
// app.get("/login", (req, res) => {
//   res.render("users/login.ejs");
// });

// app.post(
//   "/login",
//   saveRedirectUrl,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   async (req, res) => {
//     req.flash("success", "Welcome back on Blogify!");
//     let redirectUrl = res.locals.redirectUrl || "/blogs";
//     res.redirect(redirectUrl);
//   }
// );

// app.get("/signup", (req, res) => {
//   res.render("users/signup.ejs");
// });

// app.post("/signup", async (req, res) => {
//   try {
//     let { username, email, password } = req.body;
//     const newUser = new User({ email, username });
//     const registeredUser = await User.register(newUser, password);
//     console.log(registeredUser);
//     req.login(registeredUser, (err) => {
//       if (err) {
//         return next();
//       }
//       req.flash("success", "Welcome to Blogify!!!");
//       res.redirect("/blogs");
//     });
//   } catch (e) {
//     req.flash("error", e.message);
//     res.redirect("/signup");
//   }
// });

// app.get("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     } else {
//       req.flash("success", "You are logged out now...");
//       res.redirect("/login");
//     }
//   });
// });

// app.get("/contact", isLoggedin, (req, res) => {
//   res.render("blogs/contact.ejs");
// });

// app.get("/about", isLoggedin, (req, res) => {
//   res.render("blogs/about.ejs");
// });

// app.get("/user/profile", (req, res) => {
//   res.render("users/profile.ejs", { currUser: req.user });
// });

// //Blogs related routes...
// //index route
// app.get("/blogs", isLoggedin, async (req, res) => {
//   const Allblogs = await Blog.find({});
//   res.render("blogs/index.ejs", { Allblogs });
// });

// // new route
// app.get("/blogs/new", isLoggedin, (req, res) => {
//   res.render("blogs/new.ejs");
// });

//show route
// app.get("/blogs/:id", isLoggedin, async (req, res) => {
//   let { id } = req.params;
//   const blog = await Blog.findById(id).populate("owner");
//   if (!blog) {
//     req.flash("error", "blog does'nt exist...");
//     res.redirect("/blogs");
//   }
//   res.render("blogs/show.ejs", { blog });
// });

// //My blogs route
// app.get("/blogs/myBlogs/:userId", isLoggedin, async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       req.flash("error", "Invalid user ID.");
//       return res.redirect("/blogs");
//     }
//     const myBlogs = await Blog.find({ owner: userId });
//     res.render("blogs/myblogs.ejs", { myBlogs });
//   } catch (error) {
//     console.error("Error fetching user blogs:", error);
//     req.flash("error", "Failed to fetch user blogs.");
//     res.redirect("/blogs");
//   }
// });

// //create route
// app.post("/blogs", isLoggedin, async (req, res) => {
//   const newBlog = new Blog(req.body.blog);
//   newBlog.owner = req.user._id;
//   await newBlog.save();
//   console.log(newBlog);
//   req.flash("success", "New blog created...");
//   res.redirect("/blogs");
// });

//edit route
// app.get("/blogs/:id/edit", isLoggedin, isOwner, async (req, res) => {
//   let { id } = req.params;
//   const blog = await Blog.findById(id);
//   if (!blog) {
//     req.flash("error", "Blog does'nt exists...");
//     res.redirect("/blogs");
//   }
//   res.render("blogs/edit.ejs", { blog });
// });

// //update route
// app.put("/blogs/:id", isLoggedin, isOwner, async (req, res) => {
//   console.log(req.body);
//   let { id } = req.params;
//   try {
//     let blog = await Blog.findByIdAndUpdate(id, { ...req.body.blog });
//     await blog.save();
//     req.flash("success", "Blog updated successfully.");
//     res.redirect(`/blogs/${id}`);
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     req.flash("error", "Failed to update blog.");
//     res.redirect(`/blogs/${id}`);
//   }
// });

//delete blog
// app.delete("/blogs/:id", isLoggedin, isOwner, async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Blog.findByIdAndDelete(id);
//     req.flash("success", "blog deleted successfully...");
//     res.redirect("/blogs");
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/blogs/search:subject", isLoggedin, async (req, res) => {
//   try {
//     const subject = req.query.subject;
//     const data = await Blog.find({
//       subject: subject,
//     });
//     console.log(data);

//     if (data.length > 0) {
//       console.log(data);
//       res.render(`blogs/index.ejs`, { Allblogs: data });
//     } else {
//       req.flash("error", `Blogs related to "${subject}" not found...`);
//       res.redirect("/blogs");
//     }
//   } catch (error) {
//     console.error("Error searching blogs:", error);
//     req.flash("error", "An error occurred while searching blogs...");
//     res.redirect("/blogs");
//   }
// });


//mongodb+srv://mayappapujari561999:<password>@cluster0.otzgzdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0