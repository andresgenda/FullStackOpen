const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);

  if (!decodedToken.id) {
    return response.status(401).json({ error: "Invalid token" });
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    user = await User.findOne({});
  }

  const blog = new Blog({ ...request.body, user: user._id });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const blogToModify = await Blog.findById(request.params.id);

  blogToModify.title = request.body.title;
  blogToModify.author = request.body.author;
  blogToModify.url = request.body.url;
  blogToModify.likes = request.body.likes;

  const updatedBlog = await blogToModify.save();
  response.status(203).json(updatedBlog);
});

module.exports = blogsRouter;
