const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Broccoli Soup Recipe",
    author: "Andres Genda",
    url: "https://mywebpage.com/broccolisoup",
    likes: 5000,
  },
  {
    title: "Tomato Soup Recipe",
    author: "Andres Lucero",
    url: "https://mywebpage.com/tomatosoup",
    likes: 15000,
  },
];

module.exports = { initialBlogs };
