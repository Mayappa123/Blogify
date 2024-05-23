// controllers/users.js

const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next();
      }
      req.flash("success", "Welcome to Blogify!!!");
      res.redirect("/blogs");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "welcome to Blogify...");
  let redirectUrl = res.locals.redirectUrl || "/blogs";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    } else {
      req.flash("success", "You are logged out now...");
      res.redirect("/login");
    }
  });
};

module.exports.contact = (req, res) => {
  res.render("blogs/contact.ejs");
};

module.exports.about = (req, res) => {
  res.render("blogs/about.ejs");
};

module.exports.currUser = (req, res) => {
  res.render("users/profile.ejs", { currUser: req.user });
};



