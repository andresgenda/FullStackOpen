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

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
