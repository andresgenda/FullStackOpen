const blogsRouter = require("express").Router();
const blog = require("../models/blog");
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
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
