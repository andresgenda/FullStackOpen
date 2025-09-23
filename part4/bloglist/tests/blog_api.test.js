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
  test("blogs are returned as json", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, testHelper.initialBlogs.length);
  });

  test("correct blog post id name", async () => {
    const response = await api.get("/api/blogs");

    assert.strictEqual("id" in response.body[0], true);
  });

  test("a new blog can be added", async () => {
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

  test("an existing blog can be deleted", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await testHelper.blogsInDb();
    const blogTitles = blogsAtEnd.map((blog) => blog.title);

    assert(!blogTitles.includes(blogToDelete.title));
    assert.strictEqual(blogsAtEnd.length, testHelper.initialBlogs.length - 1);
  });

  test("an existing blog can be updated", async () => {
    const blogsAtStart = await testHelper.blogsInDb();
    const blogToModify = blogsAtStart[0];

    blogToModify.likes = 8000;

    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(203);

    const blogsAtEnd = await testHelper.blogsInDb();

    assert.strictEqual(blogsAtEnd[0].likes, 8000);
    assert.strictEqual(blogsAtEnd[0].title, blogsAtStart[0].title);
  });
});

after(async () => {
  await mongoose.connection.close();
});
