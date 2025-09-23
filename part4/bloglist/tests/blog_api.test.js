const { test, after, describe, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const testHelper = require("./test_helper");
const Blog = require("../models/blog");
const app = require("../app");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  let blogObject = new Blog(testHelper.initialBlogs[0]);
  await blogObject.save();

  blogObject = new Blog(testHelper.initialBlogs[1]);
  await blogObject.save();
});

describe("api requests", () => {
  test.only("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
  });

  test.only("correct blog post id name", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual("id" in response.body[0], true);
  });

  test.only("a new blog can be added", async () => {
    const newBlog = {
      title: "My Trip to Japan",
      author: "Andres Genda",
      url: "https://mywebpage.com/triptojapan",
      likes: 20000,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAfter = await testHelper.blogsInDb();
    assert.strictEqual(testHelper.initialBlogs.length + 1, blogsAfter.length);

    const blogTitles = blogsAfter.map((blog) => blog.title);
    assert(blogTitles.includes("My Trip to Japan"));
  });
});

after(async () => {
  await mongoose.connection.close();
});
