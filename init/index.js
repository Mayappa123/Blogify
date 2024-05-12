// index.js

const mongoose = require("mongoose");
const Blog = require("../models/blog.js");
const initData = require("./blogData.js");

const dbURL = process.env.ATLASDB_URL;
async function initDB() {
  try {
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "660655c37f9e4d2dac65a93a",
    }));
    await Blog.deleteMany({});
    await Blog.insertMany(initData.data);
    console.log("Data initialized successfully...");
  } catch (error) {
    console.error("Error initializing data:", error);
  }
}
// initDB();

async function main() {
  try {
    await mongoose.connect(dbURL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

module.exports = { main };
